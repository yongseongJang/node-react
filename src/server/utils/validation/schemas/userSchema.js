const Joi = require('@hapi/joi');

const userRegistrationSchema = Joi.object({
  _id: Joi.any(),
  email: Joi.string()
    .email()
    .required(),
  pw: Joi.string().required(),
  userName: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});

module.exports = { userRegistrationSchema, emailSchema };
