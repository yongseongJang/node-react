import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../actions';
import { IPost } from '../interfaces';
import { RootState } from '../reducers/types';
import { Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';

interface PostProps {
  isOpen: boolean;
  toggle: () => void;
  postId: string;
}

const Post = (props: PostProps) => {
  const dispatch = useDispatch();

  const { userName, token } = useSelector(
    (state: RootState) => state.loginReducer,
  );

  useEffect(() => {
    if (props.isOpen) {
      if (props.postId === 'new') {
        const date = getCurrentDate();
        dispatch(postActions.setNewPost(userName, date));
      } else {
        dispatch(postActions.readPost(props.postId, token));
      }
    }
  }, [props.isOpen, props.postId]);

  const { post: postInStore } = useSelector(
    (state: RootState) => state.postReducer,
  );

  const [post, setPost] = useState<IPost>({
    ...postInStore,
    createdBy: userName,
  });
  useMemo(() => setPost(postInStore), [postInStore]);

  const closeThisPost = () => {
    const date = getCurrentDate();
    setPost({ ...post, lastEdited: date });
    props.toggle();
  };

  useEffect(() => {
    if (!props.isOpen) {
      if (props.postId === 'new') {
        dispatch(postActions.createPost(post, token));
      } else {
        dispatch(postActions.updatePost(post, token));
      }
      dispatch(postActions.requestPosts(1, token));
    }
  }, [props.isOpen, post]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const key = e.target.id;
    setPost({ ...post, [key]: inputValue });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month =
      (date.getMonth() + 1) / 10 >= 1
        ? (date.getMonth() + 1).toString()
        : '0' + (date.getMonth() + 1).toString();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={closeThisPost} className="Post">
        <ModalHeader className="Post__Header">
          <div className="Post__Header__Title">
            <Input
              className="Post__Header__Title__Input"
              id="title"
              placeholder="Untitled"
              value={post.title}
              onChange={onChange}
            />
          </div>
          <div className="Post__Header__CreatedBy">
            <Label className="Post__Head__CreateBy__Label">createBy</Label>
            <div className="Post__Head__CreateBy__Content">
              {post.createdBy}
            </div>
          </div>
          <div className="Post__Header__lastEdited">
            <Label className="Post__Header__lastEdited__Label">
              lastEdited
            </Label>
            <div className="Post__Header__lastEdited__Content">
              {post.lastEdited}
            </div>
          </div>
          <div className="Post__Header__Tags">
            <Label className="Post__Header__Tags__Label">Tags</Label>
            {post.selectedTags.length !== 0 &&
              post.selectedTags.map(v => {
                return <div className="Post__Header__Tags__Content">{v}</div>;
              })}
          </div>
        </ModalHeader>
        <ModalBody className="Post__Body">
          <div className="Post__Body__Content">
            <Input
              className="Post__Body__Content__Input"
              id="content"
              type="textarea"
              placeholder="Press Enter to continue with an empty page"
              value={post.content}
              onChange={onChange}
            />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Post;
