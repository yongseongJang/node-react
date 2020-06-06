import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../actions';
import { Post } from './';
import { Pagination } from '../components';
import { RootState } from '../reducers/types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import '../styles/Table.css';

const Table = () => {
  const dispatch = useDispatch();
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>('new');
  const { token } = useSelector((state: RootState) => state.loginReducer);
  const { pagination, paginatedItems } = useSelector(
    (state: RootState) => state.postReducer,
  );
  useEffect(() => {
    getPage(1);
  }, []);

  const openPost = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id.split('_')[1];
    setPostId(id);
    setIsPostOpen(true);
  };

  const closePost = () => {
    setIsPostOpen(false);
  };

  const getPage = (requestPage: number) => {
    dispatch(postActions.requestPosts(requestPage, token));
  };

  return (
    <React.Fragment>
      <div className="Table">
        <ListGroup flush className="Table__ListGroup">
          <ListGroupItem className="Table__ListGroup__ListGroupItem">
            {paginatedItems.length > 0
              ? paginatedItems.map(v => {
                  return (
                    <div
                      key={v._id}
                      className="Table__ListGroup__ListGroupItem__Content"
                      id={`post_${v._id}`}
                      onClick={openPost}
                    >
                      <div className="Table__ListGroup__ListGroupItem__Title">
                        {v.title}
                      </div>
                      <div className="Table__ListGroup__ListGroupItem__Property">
                        {v.createdBy}
                        {v.lastEdited}
                      </div>
                    </div>
                  );
                })
              : null}
          </ListGroupItem>
          <Button
            className="Table__ListGroup__Button"
            id="post_new"
            onClick={openPost}
          >
            New
          </Button>
        </ListGroup>
        <Post isOpen={isPostOpen} toggle={closePost} postId={postId} />
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        startPage={pagination.startPage}
        endPage={pagination.endPage}
        pages={pagination.pages}
        getPage={getPage}
      />
    </React.Fragment>
  );
};

export default Table;
