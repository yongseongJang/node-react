const async = require('async');
const asyncHandler = require('../../../utils/asyncHandler');
const PostService = require('../../../services/post.service');

exports.readByUser = asyncHandler(async (req, res, next) => {
  const _id = req.data._id;

  const result = await PostService.readByUser(_id);

  res.status(200).send(result);
});

exports.readByPostId = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const result = await PostService.readByPostId(postId);

  res.status(200).send(result);
});

exports.create = asyncHandler(async (req, res, next) => {
  const post = req.body.post;

  const result = await PostService.create(post);

  res.status(201).send(result);
});

exports.deleteByPostId = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const result = await PostService.deleteByPostId(postId);

  res.status(204).send();
});

exports.updateByPostId = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const post = req.body.post;

  const result = await PostService.updateByPostId(postId, post);

  res.status(200).send();
});
