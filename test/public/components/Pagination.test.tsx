import * as React from 'react';
import { shallow } from '../enzyme';
import { Pagination } from '../../../src/public/components';

describe('<Pagination>', () => {
  const pagination = {
    currentPage: 3,
    totalPages: 6,
    startPage: 1,
    endPage: 5,
    pages: [1, 2, 3, 4, 5],
    getPage: jest.fn(),
  };

  it('should renders `.page` if props.pages is not null', () => {
    const wrapper = shallow(
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        startPage={pagination.startPage}
        endPage={pagination.endPage}
        pages={pagination.pages}
        getPage={pagination.getPage}
      />,
    );

    expect(wrapper.find('#page')).toHaveLength(5);
  });
});
