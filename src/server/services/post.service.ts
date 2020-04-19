import PostRepository from '../models/repositories/post.repository';
import UserRepository from '../models/repositories/user.repository';
import createValidator from '../utils/validation/createValidator';
import { postSchema } from '../utils/validation/schemas/postSchema';
import { Post as IPost } from '../interfaces';

const validatePost = createValidator(postSchema);

class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  public readByUser = async (email: string): Promise<Array<IPost> | null> => {
    try {
      const user = await this.userRepository.readUserInfoByUserEmail(email);

      if (user !== null) {
        return await this.postRepository.readByUser(user);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };

  public readByPostId = async (postId: string): Promise<IPost | null> => {
    try {
      return await this.postRepository.readByPostId(postId);
    } catch (err) {
      throw err;
    }
  };

  public create = async (post: IPost) => {
    try {
      const validatedPost = await validatePost(post);

      return await this.postRepository.create(validatedPost);
    } catch (err) {
      throw err;
    }
  };

  public deleteByPostId = async (postId: string) => {
    try {
      return await this.postRepository.deleteByPostId(postId);
    } catch (err) {
      throw err;
    }
  };

  public updateByPostId = async (postId: string, post: IPost) => {
    try {
      const validatedPost = await validatePost(post);

      return await this.postRepository.updateByPostId(postId, validatedPost);
    } catch (err) {
      throw err;
    }
  };
}

export default PostService;
