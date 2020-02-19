const async = require('async');
const UserRepository = require('../models/repositories/user.repository');
const createValidator = require('../utils/validation/createValidator');
const {
  userRegistrationSchema,
  emailSchema,
} = require('../utils/validation/schemas/userSchema');
const { Errorhandler } = require('../utils/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);
const validateEmail = createValidator(emailSchema);

exports.readUserInfoByUserEmail = async email => {
  try {
    const validatedEmail = await validateEmail(email);

    return await UserRepository.readUserInfoByUserEmail(validatedEmail);
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const validatedEmail = await validateEmail(email);

    const hash = await UserRepository.readPasswordByUserEmail(validatedEmail);

    await comparePasswordToHash(password, hash);

    const token = await getToken(email);

    return token;
  } catch (err) {
    throw err;
  }
};

exports.registerUserInfo = async userInfo => {
  try {
    const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

    const hash = await stringPasswordToHash(validatedUserInfo.pw);

    const convertedUserInfo = Object.assign({}, validatedUserInfo, {
      pw: hash,
    });

    await UserRepository.createUserInfo(convertedUserInfo);
  } catch (err) {
    throw err;
  }
};

exports.deleteUserInfoByUserEmail = async email => {
  try {
    const validatedEmail = await validateEmail(email);

    await UserRepository.deleteUserInfoByUserEmail(validatedEmail);
  } catch (err) {
    throw err;
  }
};

exports.updateUserInfoByUserEmail = async (email, userInfo) => {
  try {
    const validatedEmail = await validateEmail(email);

    const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

    await UserRepository.updateUserInfoByUserEmail(
      validatedEmail,
      validatedUserInfo,
    );
  } catch (err) {
    throw err;
  }
};

const stringPasswordToHash = password => {
  bcrypt
    .hash(password, 10)
    .then(hash => {
      return hash;
    })
    .catch(err => {
      return new Errorhandler(500, err.name, err.message);
    });
};

const comparePasswordToHash = (password, hash) => {
  bcrypt
    .compare(password, hash)
    .then(res => {
      if (!res) {
        return new Errorhandler(401, 'ValidationError', 'Invalid Password');
      }
    })
    .catch(err => {
      return new Errorhandler(500, err.name, err.message);
    });
};

const getToken = email => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email },
      process.env.PRIVATEKEY,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          reject(new Errorhandler(500, err.name, err.message));
        } else {
          resolve(token);
        }
      },
    );
  });
};
