import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../actions';
import { IPost } from '../actions/types';
import { RootState } from '../reducers/types';
import { Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';

interface PostProps {
  isOpen: boolean;
  isNewPost: boolean;
  toggle: () => void;
}

const Post = (props: PostProps) => {
  const dispatch = useDispatch();
  const postInStore = useSelector((state: RootState) => state.postReducer.post);
  const { userName, token } = useSelector(
    (state: RootState) => state.loginReducer,
  );
  const [post, setPost] = useState<IPost>({
    ...postInStore,
    createdBy: userName,
  });

  const closeThisPost = () => {
    if (props.isNewPost) {
      dispatch(postActions.createPost(post, token));
    }
    props.toggle();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const key = e.target.id;
    setPost({ ...post, [key]: inputValue });
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
              onChange={onChange}
            />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Post;
