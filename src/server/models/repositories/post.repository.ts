import * as mongoose from 'mongoose';
import Post from '../post';
import { Post as IPost, User as IUser } from '../../interfaces';
import Errorhandler from '../../utils/error';

class PostRepository {
  public readByUser = (user: IUser): Promise<Array<IPost> | null> => {
    return Post.find({ createdBy: user })
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

  public readByPostId = (postId: string): Promise<IPost | null> => {
    return Post.findOne({ _id: postId })
      .populate('createdBy')
      .lean()
      .then(doc => {
        return doc;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  };

  public create = (validatedPost: Omit<IPost, '_id'>) => {
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

  public deleteByPostId = (postId: string) => {
    return Post.deleteOne({ _id: postId })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  };

  public updateByPostId = (
    postId: string,
    validatedPost: Omit<IPost, '_id'>,
  ) => {
    return Post.updateOne({ _id: postId }, validatedPost)
      .then(res => {
        return res;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  };
}

export default PostRepository;
