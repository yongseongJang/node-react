import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginForm } from '../containers';
import { IServerSideComponentClass } from '../utils/routes';

const Login: IServerSideComponentClass = class Login extends React.Component {
  static serverFetch: { type: string; payload: object } | null;

  render() {
    return (
      <React.Fragment>
        <LoginForm />
        <NavLink to="/signup">Sign Up</NavLink>
      </React.Fragment>
    );
  }
};

export default Login;
