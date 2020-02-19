const mongod = require('../../mongod');
const async = require('async');
const UserRepository = require('../../../src/server/models/repositories/user.repository');
const User = require('../../../src/server/models/user');

describe('user repository unit tests', () => {
  const users = [{ email: 'test@gmail.com', pw: '123', userName: 'google' }];

  const findOne = async email => {
    return await User.findOne({ email })
      .lean()
      .then(doc => {
        return doc;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  };

  beforeAll(async () => {
    await mongod.connect();
  });

  beforeEach(async () => {
    await User.create(users);
  });

  afterEach(async () => {
    await mongod.clear();
  });

  afterAll(async () => {
    await mongod.close();
  });

  describe('readUserInfoByUserEmail', () => {
    it('should retrieve the correct user if email was matched', async () => {
      const email = 'test@gmail.com';

      const result = await UserRepository.readUserInfoByUserEmail(email);

      expect(result).not.toBeNull();
      expect(result.email).toBe(users[0].email);
    });
  });

  describe('readPasswordByUserEmail', () => {
    it('should retrieve the correct password if email was matched', async () => {
      const email = 'test@gmail.com';

      const result = await UserRepository.readPasswordByUserEmail(email);

      expect(result).not.toBeNull();
      expect(result.pw).toBe(users[0].pw);
    });
  });

  describe('createUserInfo', () => {
    it('should create correct user if properties type of user object was matched schematypes', async () => {
      const user = { email: 'test@naver.com', pw: '123', userName: 'naver' };

      await UserRepository.createUserInfo(user);

      const result = await findOne(user.email);

      expect(result).not.toBeNull();
      expect(result.email).toBe(user.email);
    });
  });

  describe('deleteUserInfoByUserEmail', () => {
    it('should delete correct user if email was matched', async () => {
      const email = 'test@gmail.com';

      await UserRepository.deleteUserInfoByUserEmail(email);

      const result = await findOne(email);

      expect(result).toBeNull();
    });
  });

  describe('updateUserInfoByUserEmail', () => {
    it('should update correct user if email was matched', async () => {
      const email = 'test@gmail.com';
      const user = { email: 'test@gmail.com', pw: '123', userName: 'naver' };

      await UserRepository.updateUserInfoByUserEmail(email, user);

      const result = await findOne(email);

      expect(result.userName).toBe(user.userName);
    });
  });
});
