const jwt = require('jsonwebtoken');
const { Errorhandler } = require('../../utils/error');

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATEKEY, (err, user) => {
      if (err) {
        next(new Errorhandler(403));
      }

      req.user = user;
      next();
    });
  } else {
    next(new Errorhandler(401));
  }
};

module.exports = authentication;
