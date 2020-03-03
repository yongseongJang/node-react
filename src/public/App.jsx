import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Signup, Dashboard, Error } from './pages';
import { Head } from './components';

const App = () => {
  return (
    <div className="App">
      <Head
        title="Express and React"
        description="Server side rendering test"
      />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};

export default App;
