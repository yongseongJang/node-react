import axios from 'axios';
import { IUserInfo } from '../actions/types';

const signup = (userInfo: IUserInfo) => {
  return axios.post('/api/users', { userInfo }).catch(err => {
    throw err;
  });
};

export const signupServices = {
  signup,
};
