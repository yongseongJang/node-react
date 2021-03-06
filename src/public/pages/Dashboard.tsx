import * as React from 'react';
import { MenuBar, Table } from '../containers';
import { Head } from '../components';
import { IServerSideComponentClass } from '../utils/routes';

const Dashboard: IServerSideComponentClass = class Dashboard extends React.Component {
  static serverFetch: { type: string; payload: object } | null;

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
      </React.Fragment>
    );
  }
};

export default Dashboard;
