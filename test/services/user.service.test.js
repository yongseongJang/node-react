const async = require('async');
const UserService = require('../../src/server/services/user.service');
const UserRepository = require('../../src/server/models/repositories/user.repository');
const createValidator = require('../../src/server/utils/validation/createValidator');
const {
  userRegistrationSchema,
  emailSchema,
} = require('../../src/server/utils/validation/schemas/userSchema');
const mongod = require('../mongod');

describe('user service unit tests', () => {
  describe('readUserInfoByUserEmail', () => {
    it('should throw error if email was invalidated', async () => {
      const email = 'test';

      const validateEmail = createValidator(emailSchema);

      await expect(validateEmail(email)).rejects.toThrow();
    });

    it('should invoke readUserInfoByuserEmail with argument', async () => {
      const email = 'test@gmail.com';

      UserRepository.readUserInfoByUserEmail = jest.fn();
      await UserService.readUserInfoByUserEmail(email);

      expect(UserRepository.readUserInfoByUserEmail).toHaveBeenCalledTimes(1);
      expect(UserRepository.readUserInfoByUserEmail).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe('login', () => {
    it('should throw error if email was invalidated', async () => {
      const email = 'test';

      const validateEmail = createValidator(emailSchema);

      await expect(validateEmail(email)).rejects.toThrow();
    });

    it('should invoke login with argument', async () => {
      const email = 'test@gmail.com';
      const password = '123';

      UserRepository.readPasswordByUserEmail = jest.fn();
      await UserService.login(email, password);

      expect(UserRepository.readPasswordByUserEmail).toHaveBeenCalledTimes(1);
      expect(UserRepository.readPasswordByUserEmail).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe('registerUserInfo', () => {
    it('should throw error if userInfo was invalidated', async () => {
      const userInfo = { email: 'test', pw: '123', userName: 'naver' };

      const validateUserinfo = createValidator(userRegistrationSchema);

      await expect(validateUserinfo(userInfo)).rejects.toThrow();
    });

    it('should invoke createUserInfo with argument', async () => {
      const userInfo = {
        email: 'test@gmail.com',
        pw: '123',
        userName: 'google',
      };

      UserRepository.createUserInfo = jest.fn();
      await UserService.registerUserInfo(userInfo);

      expect(UserRepository.createUserInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUserInfoByUserEmail', () => {
    it('should throw error if email was invalidated', async () => {
      const email = 'test';

      const validateEmail = createValidator(emailSchema);

      await expect(validateEmail(email)).rejects.toThrow();
    });
    it('should invoke deleteUserInfoByUserEmail with argument', async () => {
      const email = 'test@gmail.com';

      UserRepository.deleteUserInfoByUserEmail = jest.fn();
      await UserService.deleteUserInfoByUserEmail(email);

      expect(UserRepository.deleteUserInfoByUserEmail).toHaveBeenCalledTimes(1);
      expect(UserRepository.deleteUserInfoByUserEmail).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe('updateUserInfoByUserEmail', () => {
    it('should throw error if email was invalidated', async () => {
      const email = 'test';

      const validateEmail = createValidator(emailSchema);

      await expect(validateEmail(email)).rejects.toThrow();
    });

    it('should throw error if userInfo was invalidated', async () => {
      const userInfo = { email: 'test', pw: '123', userName: 'naver' };

      const validateUserinfo = createValidator(userRegistrationSchema);

      await expect(validateUserinfo(userInfo)).rejects.toThrow();
    });

    it('should invoke updateUserInfoByUserEmail with argument', async () => {
      const email = 'test@gmail.com';
      const userInfo = {
        email: 'test@gmail.com',
        pw: '123',
        userName: 'naver',
      };

      UserRepository.updateUserInfoByUserEmail = jest.fn();
      await UserService.updateUserInfoByUserEmail(email, userInfo);

      expect(UserRepository.updateUserInfoByUserEmail).toHaveBeenCalledTimes(1);
      expect(UserRepository.updateUserInfoByUserEmail).toHaveBeenCalledWith(
        email,
        userInfo,
      );
    });
  });
});

describe('user service integration test', () => {
  beforeAll(async () => {
    await mongod.connect();
  });

  afterEach(async () => {
    await mongod.clear();
  });

  afterAll(async () => {
    await mongod.close();
  });

  describe('rigisterUserInfo and login', () => {
    it('should create user and should get token if email and password was validated', async () => {
      const userInfo = {
        email: 'test@gmail.com',
        pw: '123',
        userName: 'google',
      };

      await UserService.registerUserInfo(userInfo);

      const result = await UserService.login(userInfo.email, userInfo.pw);

      expect(result).not.toBeNull();
    });
  });
});
