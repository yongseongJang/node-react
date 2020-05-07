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
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.loginReducer);
  const { pagination, paginatedItems } = useSelector(
    (state: RootState) => state.postReducer,
  );
  useEffect(() => {
    getPage(1);
  }, []);

  const openNewPost = () => {
    setIsNewPostOpen(true);
  };

  const closeNewPost = () => {
    setIsNewPostOpen(false);
    dispatch(postActions.requestPosts(1, token));
  };

  const getPage = (requestPage: number) => {
    dispatch(postActions.requestPosts(requestPage, token));
  };

  console.log(pagination);
  return (
    <div className="Table">
      <ListGroup flush className="Table__ListGroup">
        <ListGroupItem className="Table__ListGroup__ListGroupItem">
          {paginatedItems.length > 0
            ? paginatedItems.map(v => {
                return (
                  <div className="Table__ListGroup__ListGroupItem__Content">
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
        <Button className="Table__ListGroup__Button" onClick={openNewPost}>
          New
        </Button>
        <Post isOpen={isNewPostOpen} toggle={closeNewPost} isNewPost={true} />
      </ListGroup>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        startPage={pagination.startPage}
        endPage={pagination.endPage}
        pages={pagination.pages}
        getPage={getPage}
      />
    </div>
  );
};

export default Table;
