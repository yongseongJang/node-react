import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../styles/Table.css';

const Table = () => {
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
      </ListGroup>
    </div>
  );
};

export default Table;
