const async = require('async');
const PostService = require('../../src/server/services/post.service');
const PostRepository = require('../../src/server/models/repositories/post.repository');
const createValidator = require('../../src/server/utils/validation/createValidator');
const postSchema = require('../../src/server/utils/validation/schemas/postSchema');

describe('posts service unit tests', () => {
  describe('readByUser', () => {
    it('should invoke readByUser with argument', async () => {
      const _id = '5a23c1b5d52a003c98e13f1a';
      PostRepository.readByUser = jest.fn();

      await PostService.readByUser(_id);

      expect(PostRepository.readByUser).toHaveBeenCalledWith(_id);
      expect(PostRepository.readByUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('readByPostId', () => {
    it('should invoke readByPostId with argument', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';
      PostRepository.readByPostId = jest.fn();

      await PostService.readByPostId(postId);

      expect(PostRepository.readByPostId).toHaveBeenCalledTimes(1);
      expect(PostRepository.readByPostId).toHaveBeenCalledWith(postId);
    });
  });

  describe('create', () => {
    it('should throw error if post is invalidated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: 'a day ago',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(PostService.create(post)).rejects.toThrow();
    });

    it('should invoked create with argument if post is validated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: '2020-02-02',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      PostRepository.create = jest.fn();

      const validatePost = createValidator(postSchema);

      const validatedPost = await validatePost(post);

      await PostService.create(post);

      expect(PostRepository.create).toHaveBeenCalledTimes(1);
      expect(PostRepository.create).toHaveBeenCalledWith(validatedPost);
    });
  });

  describe('deleteByPostId', () => {
    it('should invoked deleteByPostId with argument', async () => {
      const postId = '5a23c1b5d52a003c98e13f1a';

      PostRepository.deleteByPostId = jest.fn();

      await PostRepository.deleteByPostId(postId);

      expect(PostRepository.deleteByPostId).toHaveBeenCalledTimes(1);
      expect(PostRepository.deleteByPostId).toHaveBeenCalledWith(postId);
    });
  });

  describe('updateByPostId', () => {
    it('should throw error if post is invalidated', async () => {
      const post = {
        _id: '5a23c1b5d52a003c98e13f1a',
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: 'a day ago',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(PostService.create(post)).rejects.toThrow();
    });

    it('should invoked updateByPostId with argument if post is validated', async () => {
      const postId = '5a23c1b5d52a003c98e13f1a';
      const post = {
        _id: postId,
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: '2020-02-02',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      PostRepository.updateByPostId = jest.fn();

      const validatePost = createValidator(postSchema);

      const validatedPost = await validatePost(post);

      await PostService.updateByPostId(postId, validatedPost);

      expect(PostRepository.updateByPostId).toHaveBeenCalledTimes(1);
      expect(PostRepository.updateByPostId).toHaveBeenCalledWith(
        postId,
        validatedPost,
      );
    });
  });
});
