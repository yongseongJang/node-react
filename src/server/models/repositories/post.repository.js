const mongoose = require('mongoose');
const Post = require('../post');
const { Errorhandler } = require('../../utils/error');

exports.readByUser = _id => {
  return Post.find({ createdBy: mongoose.Types.ObjectId(_id) })
    .select({ tags: 0, content: 0 })
    .populate('createdBy')
    .lean()
    .then(docs => {
      return docs;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.readByPostId = postId => {
  return Post.findOne({ _id: mongoose.Types.ObjectId(postId) })
    .populate('createdBy')
    .lean()
    .then(doc => {
      return doc;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.create = validatedPost => {
  const post = new Post(validatedPost);
  return post
    .save()
    .then(doc => {
      return { _id: doc._id };
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.deleteByPostId = postId => {
  return Post.deleteOne({ _id: postId })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};

exports.updateByPostId = (postId, validatedPost) => {
  return Post.updateOne({ _id: postId }, validatedPost)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
};
