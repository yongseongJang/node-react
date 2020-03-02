import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginForm } from '../containers';

const Login = props => {
  return (
    <React.Fragment>
      <LoginForm />
      <NavLink to="/signup">Sign Up</NavLink>
    </React.Fragment>
  );
};

export default Login;
