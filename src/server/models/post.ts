import * as mongoose from 'mongoose';
import { Post as IPost } from '../interfaces';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  createdBy: String,
  lastEdited: String,
  tags: [String],
  selectedTags: [String],
  content: String,
});

const Post = mongoose.model<IPost & mongoose.Document>('Post', postSchema);

export default Post;
