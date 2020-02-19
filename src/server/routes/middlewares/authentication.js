const jwt = require('jsonwebtoken');
const { Errorhandler } = require('../../utils/error');

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATEKEY, (err, user) => {
      if (err) {
        return next(new Errorhandler(401, 'ValidationError', 'Invalid token'));
      }

      req.user = user;
      return next();
    });
  } else {
    return next(
      new Errorhandler(401, 'ValidationError', 'No exist authHeader'),
    );
  }
};

module.exports = authentication;
