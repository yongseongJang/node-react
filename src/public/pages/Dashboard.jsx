import React, { Component } from 'react';
import { MenuBar } from '../containers';
import { Table, Pagination } from '../components';
import { Head } from '../components';

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Head
          title="Express and React"
          description="Server side rendering test"
          keywords="NodeJS, Express, React, Redux, Redux-saga"
        />
        <MenuBar />
        <Table />
        <Pagination />
      </React.Fragment>
    );
  }
}

export default Dashboard;
