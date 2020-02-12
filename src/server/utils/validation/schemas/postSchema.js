const Joi = require('@hapi/joi');

const postSchema = Joi.object({
  _id: Joi.any(),
  title: Joi.string(),
  createdBy: Joi.string().required(),
  lastEdited: Joi.date().required(),
  tags: Joi.array().items(Joi.string()),
  selectedTags: Joi.array().items(Joi.string()),
  content: Joi.string(),
});

module.exports = postSchema;
