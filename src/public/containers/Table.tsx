import * as React from 'react';
import { useState } from 'react';
import { postActions } from '../actions';
import { Post } from './';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import '../styles/Table.css';

const Table = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);

  const openNewPost = () => {
    setIsNewPostOpen(true);
  };

  const closeNewPost = () => {
    setIsNewPostOpen(false);
  };

  return (
    <div className="Table">
      <ListGroup flush className="Table__ListGroup">
        <ListGroupItem className="Table__ListGroup__ListGroupItem">
          <div className="Table__ListGroup__ListGroupItem__Content">
            <div className="Table__ListGroup__ListGroupItem__Title">title</div>
            <div className="Table__ListGroup__ListGroupItem__Property">
              property
            </div>
          </div>
        </ListGroupItem>
        <Button className="Table__ListGroup__Button" onClick={openNewPost}>
          New
        </Button>
        <Post isOpen={isNewPostOpen} toggle={closeNewPost} isNewPost={true} />
      </ListGroup>
    </div>
  );
};

export default Table;
