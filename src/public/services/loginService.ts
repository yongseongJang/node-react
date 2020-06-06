import axios from 'axios';

const login = async (email: string, password: string): Promise<object> => {
  return await axios
    .post('/api/users/login', { email, password })
    .then(res => {
      const { token, authExpirationTime: expirationTime, userName } = res.data;
      return { token, expirationTime, userName };
    })
    .catch(err => {
      throw err;
    });
};

export const loginServices = {
  login,
};
