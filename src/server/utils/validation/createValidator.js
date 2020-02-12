const Joi = require('@hapi/joi');
const { Errorhandler } = require('../error');

const createValidator = schema => payload => {
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Errorhandler(400, 'ValidationError');
  }

  return value;
};

module.exports = createValidator;
