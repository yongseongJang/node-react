import { Login, Signup, Dashboard } from '../pages';

export const routes = [
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
