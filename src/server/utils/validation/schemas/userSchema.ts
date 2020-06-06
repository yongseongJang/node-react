import * as Joi from '@hapi/joi';

export const userRegistrationSchema = Joi.object({
  _id: Joi.any(),
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net'] } })
    .required(),
  pw: Joi.string().required(),
  userName: Joi.string().required(),
});

export const emailSchema = Joi.string()
  .email({ tlds: { allow: ['com', 'net'] } })
  .required();
