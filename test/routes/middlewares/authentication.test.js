const async = require('async');
const authentication = require('../../../src/server/routes/middlewares/authentication');
const { Errorhandler } = require('../../../src/server/utils/error');

describe('authentication', () => {
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
