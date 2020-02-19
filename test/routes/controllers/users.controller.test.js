const async = require('async');
const UserController = require('../../../src/server/routes/controllers/users/users.controller');
const UserService = require('../../../src/server/services/user.service');

describe('user controller unit test', () => {
  describe('readUserInfoByUserEmail', () => {
    it('should response 200 if UserService readUserInfoByUserEmail operated correctly', async () => {
      const req = { user: { email: 'test@gmail.com' } };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.readUserInfoByUserEmail = jest.fn();

      await UserController.readUserInfoByUserEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if UserService readUserInfoByUserEmail throw error', async () => {
      const req = { user: { email: 'test@gmail.com' } };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.readUserInfoByUserEmail = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(
        UserController.readUserInfoByUserEmail(req, res),
      ).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should response 200 if UserService login operated correctly', async () => {
      const req = { body: { email: 'test@gmail.com', password: '123' } };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.login = jest.fn();

      await UserController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should throw error if UserService login throw error', async () => {
      const req = { body: { email: 'test@gmail.com', password: '123' } };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.login = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(UserController.login(req, res)).rejects.toThrow();
    });
  });

  describe('registerUserInfo', () => {
    it('should response 200 if UserService registerUserInfo operated correctly', async () => {
      const req = {
        body: {
          userInfo: {
            email: 'test@gmail.com',
            password: '123',
            userName: 'google',
          },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.registerUserInfo = jest.fn();

      await UserController.registerUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should throw error if UserService registerUserInfo throw error', async () => {
      const req = {
        body: {
          userInfo: { email: 'test@gmail.com', pw: '123', userName: 'google' },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.registerUserInfo = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(UserController.registerUserInfo(req, res)).rejects.toThrow();
    });
  });

  describe('deleteUserInfoByUserEmail', () => {
    it('should response 200 if UserService deleteUserInfoByUserEmail operated correctly', async () => {
      const req = { user: { email: 'test@gmail.com' } };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.deleteUserInfoByUserEmail = jest.fn();

      await UserController.deleteUserInfoByUserEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if UserService deleteUserInfoByUserEmail throw error', async () => {
      const req = { email: 'test@gmail.com' };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.deleteUserInfoByUserEmail = jest
        .fn()
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(
        UserController.deleteUserInfoByUserEmail(req, res),
      ).rejects.toThrow();
    });
  });

  describe('updateUserInfoByUserEmail', () => {
    it('should response 200 if UserService updateUserInfoByUserEmail operated correctly', async () => {
      const req = {
        user: { email: 'test@gmail.com' },
        body: {
          userInfo: { email: 'test@gmail.com', pw: '123', userName: 'naver' },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.updateUserInfoByUserEmail = jest.fn();

      await UserController.updateUserInfoByUserEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if UserService updateUserInfoByUserEmail throw error', async () => {
      const req = {
        user: { email: 'test@gmail.com' },
        body: {
          userInfo: { email: 'test@gmail.com', pw: '123', userName: 'naver' },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      UserService.updateUserInfoByUserEmail = jest
        .fn()
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(
        UserController.updateUserInfoByUserEmail(req, res),
      ).rejects.toThrow();
    });
  });
});
