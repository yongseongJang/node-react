import React, { Component } from 'react';
import { MenuBar } from '../containers';
import { Table, Pagination } from '../components';

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <MenuBar />
        <Table />
        <Pagination />
      </React.Fragment>
    );
  }
}

export default Dashboard;
