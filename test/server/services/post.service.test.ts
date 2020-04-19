import PostService from '../../../src/server/services/post.service';
import createValidator from '../../../src/server/utils/validation/createValidator';
import { postSchema } from '../../../src/server/utils/validation/schemas/postSchema';
import { User as IUser } from '../../../src/server/interfaces';

describe('posts service unit tests', () => {
  const postService = new PostService();

  describe('readByUser', () => {
    it('should invoke readByUser with argument', async () => {
      const email = 'test@naver.com'
      const user = {} as IUser;
      postService['postRepository'].readByUser = jest.fn();
      postService['userRepository'].readUserInfoByUserEmail = jest.fn().mockReturnValue(user);

      await postService.readByUser(email);

      expect(postService['postRepository'].readByUser).toHaveBeenCalledWith(user);
      expect(postService['postRepository'].readByUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('readByPostId', () => {
    it('should invoke readByPostId with argument', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';
      postService['postRepository'].readByPostId = jest.fn();

      await postService.readByPostId(postId);

      expect(postService['postRepository'].readByPostId).toHaveBeenCalledTimes(1);
      expect(postService['postRepository'].readByPostId).toHaveBeenCalledWith(postId);
    });
  });

  describe('create', () => {
    it('should throw error if post is invalidated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: {} as IUser,
        lastEdited: 'a day ago',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(postService.create(post)).rejects.toThrow();
    });

    it('should invoked create with argument if post is validated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: {} as IUser,
        lastEdited: new Date('2020-02-02'),
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      postService['postRepository'].create = jest.fn();

      await postService.create(post);

      expect(postService['postRepository'].create).toHaveBeenCalledTimes(1);
      expect(postService['postRepository'].create).toHaveBeenCalledWith(post);
    });
  });

  describe('deleteByPostId', () => {
    it('should invoked deleteByPostId with argument', async () => {
      const postId = '5a23c1b5d52a003c98e13f1a';

      postService['postRepository'].deleteByPostId = jest.fn();

      await postService.deleteByPostId(postId);

      expect(postService['postRepository'].deleteByPostId).toHaveBeenCalledTimes(1);
      expect(postService['postRepository'].deleteByPostId).toHaveBeenCalledWith(postId);
    });
  });

  describe('updateByPostId', () => {
    it('should throw error if post is invalidated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: {} as IUser,
        lastEdited: 'a day ago',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(postService.create(post)).rejects.toThrow();
    });

    it('should invoked updateByPostId with argument if post is validated', async () => {
      const postId = '5a23c1b5d52a003c98e13f1a';
      const post = {
        _id: postId,
        title: 'React',
        createdBy: {} as IUser,
        lastEdited: new Date('2020-02-02'),
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      postService['postRepository'].updateByPostId = jest.fn();

      await postService.updateByPostId(postId, post);

      expect(postService['postRepository'].updateByPostId).toHaveBeenCalledTimes(1);
      expect(postService['postRepository'].updateByPostId).toHaveBeenCalledWith(
        postId,
        post,
      );
    });
  });
});
