import { loginServices } from '../../../src/public/services';
import axios from 'axios';

describe('login service', () => {
  it('should return token, exirationTime and userName if request login with valid info', async () => {
    const res = {
      data: { token: 'tokenValue', authExpirationTime: '1', userName: 'test' },
    };
    axios.post = jest.fn().mockReturnValue(Promise.resolve(res));

    const result = await loginServices.login('test@gmail.com', '123');
    expect(result).toEqual({
      token: res.data.token,
      expirationTime: res.data.authExpirationTime,
      userName: res.data.userName,
    });
  });

  it('should throw error if request login with invalid info  ', async () => {
    const error = new Error('Invalid Login Info');
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));

    expect(loginServices.login('test', '123')).rejects.toThrow(error);
  });
});
