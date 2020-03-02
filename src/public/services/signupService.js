import axios from 'axios';

const signup = userInfo => {
  return axios.post('/api/users', { userInfo }).catch(err => {
    throw err;
  });
};

export const signupServices = {
  signup,
};
