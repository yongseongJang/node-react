class Errorhandler extends Error {
  constructor(statusCode, name, message) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, name, message } = err;

  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).send();
  }

  res.status(statusCode).json({
    statusCode,
    name,
    message,
  });
};

module.exports = {
  Errorhandler,
  handleError,
};
