const Joi = require('@hapi/joi');

const userRegistrationSchema = Joi.object({
  _id: Joi.any(),
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net'] } })
    .required(),
  pw: Joi.string().required(),
  userName: Joi.string().required(),
});

const emailSchema = Joi.string()
  .email({ tlds: { allow: ['com', 'net'] } })
  .required();

module.exports = { userRegistrationSchema, emailSchema };
