import PostRepository from '../models/repositories/post.repository';
import UserRepository from '../models/repositories/user.repository';
import createValidator from '../utils/validation/createValidator';
import { postSchema } from '../utils/validation/schemas/postSchema';
import { Post as IPost, Pagination } from '../interfaces';
import Errorhandler from '../utils/error';

const validatePost = createValidator(postSchema);

class PostService {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  public readByUser = async (email: string, page: number): Promise<{ pagination: object, paginatedItems: Array<IPost> | null }> => {
    try {
      const user = await this.userRepository.readUserInfoByUserEmail(email);

      if (user !== null) {
        const items = await this.postRepository.readByUser(user);

        const itemLength = items ? items.length : 0;

        const pagination: Pagination = await this.paginate(itemLength, page);
        const paginatedItems = items ? items.slice(pagination.startIndex, pagination.endIndex + 1) : null;
        return { pagination, paginatedItems };
      } else {
        throw new Errorhandler(500, 'Internal Server Error', 'Internal Server Error');
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

  private paginate = async (totalItems: number, currentPage: number = 1, pageSize: number = 3, maxPages: number = 5): Promise<Pagination> => {
    return new Promise((resolve, reject) => {
      let totalPages = Math.ceil(totalItems / pageSize);

      if (currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      let startPage: number, endPage: number;
      if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        let pagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let pagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= pagesBeforeCurrentPage) {
          startPage = 1;
          endPage = maxPages;
        } else if (currentPage + pagesAfterCurrentPage >= totalPages) {
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - pagesBeforeCurrentPage;
          endPage = currentPage + pagesAfterCurrentPage;
        }
      }

      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      let pages = Array.from(Array(endPage - startPage + 1).keys()).map(v => { return startPage + v });

      resolve({
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
      });
    })
  }
}



export default PostService;
