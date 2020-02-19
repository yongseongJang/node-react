const async = require('async');
const authentication = require('../../../src/server/routes/middlewares/authentication');
const { Errorhandler } = require('../../../src/server/utils/error');
const mongod = require('../../mongod');
const UserService = require('../../../src/server/services/user.service');

describe('authentication unit test', () => {
  it('should throw error if authHeader is not exist', () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

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
    };
    const res = {};
    const next = jest.fn();

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
    const userInfo = {
      email: 'test@gmail.com',
      pw: '123',
      userName: 'google',
    };

    await UserService.registerUserInfo(userInfo);

    const token = await UserService.login(userInfo.email, userInfo.pw);
    const headers = { authorization: 'Bearer ' + token };
    const req = { headers };
    const res = {};
    const next = jest.fn();

    authentication(req, res, next);

    expect(req.user.email).toBe(userInfo.email);
    expect(next).toHaveBeenCalledWith();
  });
});
