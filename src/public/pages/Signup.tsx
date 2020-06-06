import * as React from 'react';
import { SignupForm } from '../containers';
import { IServerSideComponentClass } from '../utils/routes';

const Signup: IServerSideComponentClass = class Signup extends React.Component {
  static serverFetch: { type: string; payload: object } | null;

  render() {
    return (
      <React.Fragment>
        <SignupForm />
      </React.Fragment>
    );
  }
};

export default Signup;
