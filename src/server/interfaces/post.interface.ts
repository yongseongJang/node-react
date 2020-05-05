import * as mongoose from 'mongoose';
import { User } from '.';

interface Post {
  _id: string;
  title: string;
  createdBy: string;
  lastEdited: Date;
  tags: Array<string>;
  selectedTags: Array<string>;
  content: string;
}

export default Post;
