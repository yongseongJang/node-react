import * as React from 'react';
import {
  Pagination as RPagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  pages: Array<number>;
  getPage: (requestPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const handlePageClick = (e: React.MouseEvent<HTMLElement>) => {
    const page = e.currentTarget.id;
    if (page === 'first') {
      props.getPage(1);
    } else if (page === 'previous') {
      props.getPage(props.currentPage - 1);
    } else if (page === 'next') {
      props.getPage(props.currentPage + 1);
    } else if (page === 'last') {
      props.getPage(props.totalPages);
    } else {
      props.getPage(Number(e.currentTarget.innerText));
    }
  };

  return (
    <RPagination className="Pagination">
      <React.Fragment>
        <PaginationItem disabled={props.currentPage === 1}>
          <PaginationLink id="first" first onClick={handlePageClick} />
        </PaginationItem>
        <PaginationItem disabled={props.currentPage === 1}>
          <PaginationLink id="previous" previous onClick={handlePageClick} />
        </PaginationItem>
      </React.Fragment>
      {props.pages &&
        props.pages.map(page => {
          return (
            <PaginationItem key={page} active={props.currentPage === page}>
              <PaginationLink id="page" onClick={handlePageClick}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      <React.Fragment>
        <PaginationItem disabled={props.currentPage === props.totalPages}>
          <PaginationLink id="next" next onClick={handlePageClick} />
        </PaginationItem>
        <PaginationItem disabled={props.currentPage === props.totalPages}>
          <PaginationLink id="last" last onClick={handlePageClick} />
        </PaginationItem>
      </React.Fragment>
    </RPagination>
  );
};

export default Pagination;
