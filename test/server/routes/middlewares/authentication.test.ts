import authentication from '../../../../src/server/routes/middlewares/authentication';
import Errorhandler from '../../../../src/server/utils/error';
import { mongod } from '../../mongod';
import UserService from '../../../../src/server/services/user.service';
import {
  RequestWithUser,
  User as IUser,
} from '../../../../src/server/interfaces';
import { Response, NextFunction } from 'express';

describe('authentication unit test', () => {
  it('should throw error if authHeader is not exist', () => {
    const req = { headers: {} } as RequestWithUser;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    authentication(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new Errorhandler(401, 'ValidationError', 'No exist authHeader'),
    );
  });

  it('should throw error if token is not validated', async () => {
    const req = {
      headers: {
        authorization:
          ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    } as RequestWithUser;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    authentication(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new Errorhandler(401, 'ValidationError', 'Invalid token'),
    );
  });
});

describe('authentication integration test', () => {
  beforeAll(async () => {
    await mongod.connect();
  });

  afterEach(async () => {
    await mongod.clear();
  });

  afterAll(async () => {
    await mongod.close();
  });
  it('should have property user in req if token was validated', async () => {
    const userInfo: IUser = {
      email: 'test@gmail.com',
      pw: '123',
      userName: 'google',
    };

    const userService = new UserService();

    await userService.registerUserInfo(userInfo);

    const { token } = await userService.login(userInfo.email, userInfo.pw);
    const headers = { authorization: 'Bearer ' + token };
    const req = { headers } as RequestWithUser;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    authentication(req, res, next);

    expect(req.user.email).toBe(userInfo.email);
    expect(next).toHaveBeenCalledWith();
  });
});
