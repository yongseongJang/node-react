import axios from 'axios';

const login = async (email, password) => {
  return await axios
    .post('/api/users/login', { email, password })
    .then(res => {
      const { token, authExpirationTime: expirationTime } = res.data;
      return { token, expirationTime };
    })
    .catch(err => {
      throw err;
    });
};

export const loginServices = {
  login,
};
