import UserController from '../../../../src/server/routes/controllers/users/users.controller';
import { Response, Request, NextFunction } from 'express';
import { RequestWithUser } from '../../../../src/server/interfaces';

describe('user controller unit test', () => {
  const userController = new UserController();

  describe('readUserInfoByUserEmail', () => {
    it('should response 200 if UserService readUserInfoByUserEmail operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' }
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].readUserInfoByUserEmail = jest.fn();

      await userController.readUserInfoByUserEmail(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if UserService readUserInfoByUserEmail throw error', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' }
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController[
        'userService'
      ].readUserInfoByUserEmail = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(
        userController.readUserInfoByUserEmail(req, res, next),
      ).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should response 200 if UserService login operated correctly', async () => {
      const req = {} as Request;
      req.body = { email: 'test@gmail.com', password: '123' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].login = jest.fn();

      await userController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should throw error if UserService login throw error', async () => {
      const req = {} as Request;
      req.body = { email: 'test@gmail.com', password: '123' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].login = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(userController.login(req, res, next)).rejects.toThrow();
    });
  });

  describe('registerUserInfo', () => {
    it('should response 200 if UserService registerUserInfo operated correctly', async () => {
      const req = {} as Request;
      req.body = {
        userInfo: {
          email: 'test@gmail.com',
          password: '123',
          userName: 'google',
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].registerUserInfo = jest.fn();

      await userController.registerUserInfo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should throw error if UserService registerUserInfo throw error', async () => {
      const req = {} as Request;
      req.body = {
        userInfo: {
          email: 'test@gmail.com',
          password: '123',
          userName: 'google',
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController[
        'userService'
      ].registerUserInfo = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(userController.registerUserInfo(req, res, next)).rejects.toThrow();
    });
  });

  describe('deleteUserInfoByUserEmail', () => {
    it('should response 200 if UserService deleteUserInfoByUserEmail operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].deleteUserInfoByUserEmail = jest.fn();

      await userController.deleteUserInfoByUserEmail(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if UserService deleteUserInfoByUserEmail throw error', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController[
        'userService'
      ].deleteUserInfoByUserEmail = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(
        userController.deleteUserInfoByUserEmail(req, res, next),
      ).rejects.toThrow();
    });
  });

  describe('updateUserInfoByUserEmail', () => {
    it('should response 200 if UserService updateUserInfoByUserEmail operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' };
      req.body = {
        userInfo: { email: 'test@gmail.com', pw: '123', userName: 'naver' },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController['userService'].updateUserInfoByUserEmail = jest.fn();

      await userController.updateUserInfoByUserEmail(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if UserService updateUserInfoByUserEmail throw error', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@gmail.com' };
      req.body = {
        userInfo: { email: 'test@gmail.com', pw: '123', userName: 'naver' },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      userController[
        'userService'
      ].updateUserInfoByUserEmail = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(
        userController.updateUserInfoByUserEmail(req, res, next),
      ).rejects.toThrow();
    });
  });
});
