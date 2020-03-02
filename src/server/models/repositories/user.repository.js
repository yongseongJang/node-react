const User = require('../user');
const { Errorhandler } = require('../../utils/error');

exports.readUserInfoByUserEmail = validatedEmail => {
  return User.findOne({ email: validatedEmail })
    .lean()
    .then(doc => {
      return doc;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.readPasswordByUserEmail = validatedEmail => {
  return User.findOne({ email: validatedEmail })
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
  return user.save().catch(err => {
    throw new Errorhandler(500, err.name, err.message);
  });
};

exports.deleteUserInfoByUserEmail = validatedEmail => {
  return User.deleteOne({ email: validatedEmail }).catch(err => {
    throw new Errorhandler(500, err.name, err.message);
  });
};

exports.updateUserInfoByUserEmail = (validatedEmail, validatedUserInfo) => {
  return User.updateOne({ email: validatedEmail }, validatedUserInfo).catch(
    err => {
      throw new Errorhandler(500, err.name, err.message);
    },
  );
};
