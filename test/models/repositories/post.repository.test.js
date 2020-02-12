const mongod = require('../../mongod');
const async = require('async');
const PostRepository = require('../../../src/server/models/repositories/post.repository');
const Post = require('../../../src/server/models/post');
const User = require('../../../src/server/models/user');
const mongoose = require('mongoose');
const { Errorhandler } = require('../../../src/server/utils/error');

describe('post repository unit tests', () => {
  const posts = [
    {
      _id: '4a23c1b5d52a003c98e13f1a',
      title: 'Babel',
      createdBy: '5a23c1b5d52a003c98e13f1a',
      lastEdited: '2020-02-01',
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['Babel'],
      content: undefined,
    },
    {
      _id: '4a23c1b5d52a003c98e13f1b',
      title: 'Webpack',
      createdBy: '5a23c1b5d52a003c98e13f1a',
      lastEdited: '2020-02-01',
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['Webpack'],
      content: undefined,
    },
    {
      _id: '4a23c1b5d52a003c98e13f1c',
      title: 'NodeJS',
      createdBy: '5a23c1b5d52a003c98e13f1b',
      lastEdited: '2020-02-02',
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['NodeJS'],
      content: undefined,
    },
  ];

  const users = [
    {
      _id: '5a23c1b5d52a003c98e13f1a',
      email: 'test@naver.com',
      pw: 'test',
      userName: 'test',
    },
  ];

  beforeAll(async () => {
    await mongod.connect();
  });

  beforeEach(async () => {
    await User.create(users);
    await Post.create(posts);
  });

  afterEach(async () => {
    await mongod.clear();
  });

  afterAll(async () => {
    await mongod.close();
  });

  describe('readByUser', () => {
    it('should retrieve the correct posts if user _id matches ', async () => {
      const _id = '5a23c1b5d52a003c98e13f1a';

      const result = await PostRepository.readByUser(_id);

      expect(result).toHaveLength(2);
      expect(result[0].createdBy[0]._id).toEqual(mongoose.Types.ObjectId(_id));
      expect(result[1].createdBy[0]._id).toEqual(mongoose.Types.ObjectId(_id));
    });
  });

  describe('readByPostId', () => {
    it('should retrieve the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';

      const result = await PostRepository.readByPostId(postId);

      expect(result).not.toBeNull();
      expect(result._id).toEqual(mongoose.Types.ObjectId(postId));
    });
  });

  describe('create', () => {
    it('should create the correct post if properties type of post object matches schematypes', async () => {
      const post = {
        _id: '4a23c1b5d52a003c98e13f1d',
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1a',
        lastEdited: '2020-02-01',
        tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      const result = await PostRepository.create(post);
      expect(result._id).toEqual(
        mongoose.Types.ObjectId('4a23c1b5d52a003c98e13f1d'),
      );
    });

    it('should throw error if properties type of post object did not matches schematypes', async () => {
      const invalidedPost = {
        _id: '4a23c1b5d52a003c98e13f1e',
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1a',
        lastEdited: 'a month ago',
        tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(PostRepository.create(invalidedPost)).rejects.toThrow();
    });
  });

  describe('deleteByPostId', () => {
    it('should delete the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';

      const result = await PostRepository.deleteByPostId(postId);

      expect(result.deletedCount).toBe(1);
    });
  });

  describe('updateByPostId', () => {
    it('should update the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1c';

      const post = {
        _id: postId,
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: '2020-02-03',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      const result = await PostRepository.updateByPostId(postId, post);
      expect(result.nModified).toBe(1);
    });

    it('should throw error if properties type of post object did not matches schematypes', async () => {
      const postId = '4a23c1b5d52a003c98e13f1c';

      const invalidatedPost = {
        _id: postId,
        title: 'React',
        createdBy: '5a23c1b5d52a003c98e13f1b',
        lastEdited: 'a day ago',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      await expect(
        PostRepository.updateByPostId(postId, invalidatedPost),
      ).rejects.toThrow();
    });
  });
});
