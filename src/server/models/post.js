const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastEdited: Date,
  tags: [String],
  selectedTags: [String],
  content: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
