import * as Joi from '@hapi/joi';

export const postSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string(),
  createdBy: Joi.string().required(),
  lastEdited: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
  tags: Joi.array().items(Joi.string()),
  selectedTags: Joi.array().items(Joi.string()),
  content: Joi.string(),
});
