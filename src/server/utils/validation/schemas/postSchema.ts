import * as Joi from '@hapi/joi';

export const postSchema = Joi.object({
  _id: Joi.any(),
  title: Joi.string(),
  createdBy: Joi.string().required(),
  lastEdited: Joi.date().required(),
  tags: Joi.array().items(Joi.string()),
  selectedTags: Joi.array().items(Joi.string()),
  content: Joi.string(),
});
