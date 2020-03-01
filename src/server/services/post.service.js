const PostRepository = require('../models/repositories/post.repository');
const createValidator = require('../utils/validation/createValidator');
const postSchema = require('../utils/validation/schemas/postSchema');
const { Errorhandler } = require('../utils/error');

const validatePost = createValidator(postSchema);

exports.readByUser = async _id => {
  try {
    return await PostRepository.readByUser(_id);
  } catch (err) {
    throw err;
  }
};

exports.readByPostId = async postId => {
  try {
    return await PostRepository.readByPostId(postId);
  } catch (err) {
    throw err;
  }
};

exports.create = async post => {
  try {
    const validatedPost = await validatePost(post);

    return await PostRepository.create(validatedPost);
  } catch (err) {
    throw err;
  }
};

exports.deleteByPostId = async postId => {
  try {
    return await PostRepository.deleteByPostId(postId);
  } catch (err) {
    throw err;
  }
};

exports.updateByPostId = async (postId, post) => {
  try {
    const validatedPost = await validatePost(post);

    return await PostRepository.updateByPostId(postId, validatedPost);
  } catch (err) {
    throw err;
  }
};
