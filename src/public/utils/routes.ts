import { Login, Signup, Dashboard } from '../pages';

export interface IServerSideComponentClass extends React.ComponentClass {
  serverFetch: { type: string; payload: object } | null;
}

export interface IRoutes {
  path: string;
  component: IServerSideComponentClass;
  exact: boolean;
}

export const routes: Array<IRoutes> = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
];
