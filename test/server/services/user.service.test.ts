import UserService from '../../../src/server/services/user.service';
import createValidator from '../../../src/server/utils/validation/createValidator';
import {
  userRegistrationSchema,
  emailSchema,
} from '../../../src/server/utils/validation/schemas/userSchema';
import { mongod } from '../mongod';
import { User as IUser } from '../../../src/server/interfaces';

const userService = new UserService();

describe('user service unit tests', () => {
  describe('readUserInfoByUserEmail', () => {
    it('should throw error if email was invalidated', async () => {
      const email = 'test';

      const validateEmail = createValidator(emailSchema);

      await expect(validateEmail(email)).rejects.toThrow();
    });

    it('should invoke readUserInfoByuserEmail with argument', async () => {
      const email = 'test@gmail.com';

      userService['userRepository'].readUserInfoByUserEmail = jest.fn();
      await userService.readUserInfoByUserEmail(email);

      expect(
        userService['userRepository'].readUserInfoByUserEmail,
      ).toHaveBeenCalledTimes(1);
      expect(
        userService['userRepository'].readUserInfoByUserEmail,
      ).toHaveBeenCalledWith(email);
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

      userService[
        'userRepository'
      ].readPasswordByUserEmail = jest.fn().mockReturnValue({ pw: '' });

      userService['comparePasswordToHash'] = jest.fn();

      userService['userRepository'].readUserNameByUserEmail = jest.fn().mockReturnValue('userName');

      await userService.login(email, password);

      expect(
        userService['userRepository'].readPasswordByUserEmail,
      ).toHaveBeenCalledTimes(1);
      expect(
        userService['userRepository'].readPasswordByUserEmail,
      ).toHaveBeenCalledWith(email);
      expect(
        userService['userRepository'].readUserNameByUserEmail
      ).toHaveBeenCalledTimes(1);
      expect(
        userService['userRepository'].readUserNameByUserEmail
      ).toHaveBeenCalledWith(email)
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

      userService['userRepository'].createUserInfo = jest.fn();
      await userService.registerUserInfo(userInfo);

      expect(
        userService['userRepository'].createUserInfo,
      ).toHaveBeenCalledTimes(1);
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

      userService['userRepository'].deleteUserInfoByUserEmail = jest.fn();
      await userService.deleteUserInfoByUserEmail(email);

      expect(
        userService['userRepository'].deleteUserInfoByUserEmail,
      ).toHaveBeenCalledTimes(1);
      expect(
        userService['userRepository'].deleteUserInfoByUserEmail,
      ).toHaveBeenCalledWith(email);
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
      const userInfo: IUser = {
        email: 'test@gmail.com',
        pw: '123',
        userName: 'naver',
      };

      userService['userRepository'].updateUserInfoByUserEmail = jest.fn();
      await userService.updateUserInfoByUserEmail(email, userInfo);

      expect(
        userService['userRepository'].updateUserInfoByUserEmail,
      ).toHaveBeenCalledTimes(1);
      expect(
        userService['userRepository'].updateUserInfoByUserEmail,
      ).toHaveBeenCalledWith(email, userInfo);
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

      await userService.registerUserInfo(userInfo);

      const result = await userService.login(userInfo.email, userInfo.pw);

      expect(result).not.toBeNull();
    });
  });
});
