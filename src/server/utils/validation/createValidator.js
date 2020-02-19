const Joi = require('@hapi/joi');
const { Errorhandler } = require('../error');

const createValidator = schema => async payload => {
  try {
    return await schema.validateAsync(payload);
  } catch (err) {
    throw new Errorhandler(400, 'ValidationError');
  }
};

module.exports = createValidator;
