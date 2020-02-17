const User = require('../user');
const { Errorhandler } = require('../../utils/error');
const bcrypt = require('bcrypt');

exports.readUserInfoByUserEmail = validatedEmail => {
  User.findeOne({ email: validatedEmail })
    .lean()
    .then(doc => {
      return doc;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.readPasswordByUserEmail = validatedEmail => {
  User.findeOne({ email: validatedEmail })
    .select({ pw: 1 })
    .lean()
    .then(doc => {
      return doc;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.createUserInfo = convertedUserInfo => {
  const user = new User(convertedUserInfo);
  user.save().catch(err => {
    throw new Errorhandler(500, err.name, err.message);
  });
};

exports.deleteUserInfoByUserEmail = validatedEmail => {
  User.deleteOne({ emali: validatedEmail }).catch(err => {
    throw new Errorhandler(500, err.name, err.message);
  });
};

exports.updateUserInfoByUserEmail = (validatedEmail, validatedUserInfo) => {
  User.updateOne({ email: validatedEmail }, validatedUserInfo).catch(err => {
    throw new Errorhandler(500, err.name, err.message);
  });
};
