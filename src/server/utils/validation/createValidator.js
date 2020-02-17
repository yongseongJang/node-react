const Joi = require('@hapi/joi');
const { Errorhandler } = require('../error');

const createValidator = schema => async payload => {
  const { value, error } = await schema.validateAsync(payload);

  if (error) {
    throw new Errorhandler(400, 'ValidationError');
  }

  return value;
};

module.exports = createValidator;
