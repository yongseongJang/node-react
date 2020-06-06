import { mongod } from '../../mongod';
import PostRepository from '../../../../src/server/models/repositories/post.repository';
import Post from '../../../../src/server/models/post';
import User from '../../../../src/server/models/user';
import * as mongoose from 'mongoose';

describe('post repository unit tests', () => {
  const users = [
    {
      _id: '5a23c1b5d52a003c98e13f1a',
      email: 'test1@naver.com',
      pw: 'test',
      userName: 'test1',
    },
    {
      _id: '5a23c1b5d52a003c98e13f1b',
      email: 'test2@naver.com',
      pw: 'test',
      userName: 'test2',
    },
  ];

  const posts = [
    {
      _id: '4a23c1b5d52a003c98e13f1a',
      title: 'Babel',
      createdBy: users[0].userName,
      lastEdited: '2020-02-01',
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['Babel'],
      content: undefined,
    },
    {
      _id: '4a23c1b5d52a003c98e13f1b',
      title: 'Webpack',
      createdBy: users[0].userName,
      lastEdited: new Date('2020-02-01'),
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['Webpack'],
      content: undefined,
    },
    {
      _id: '4a23c1b5d52a003c98e13f1c',
      title: 'NodeJS',
      createdBy: users[1].userName,
      lastEdited: '2020-02-02',
      tags: ['Babel', 'Webpack', 'NodeJS'],
      selectedTags: ['NodeJS'],
      content: undefined,
    },
  ];

  const postRepository = new PostRepository();

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
      const result = await postRepository.readByUser(users[0]);

      expect(result).toHaveLength(2);
      expect(result[0].createdBy).toEqual(users[0].userName);
      expect(result[1].createdBy).toEqual(users[0].userName);
    });
  });

  describe('readByPostId', () => {
    it('should retrieve the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';

      const result = await postRepository.readByPostId(postId);

      expect(result).not.toBeNull();
      expect(result._id.toString()).toEqual(postId);
    });
  });

  describe('create', () => {
    it('should create the correct post if properties type of post object matches schematypes', async () => {
      const post = {
        _id: '4a23c1b5d52a003c98e13f1d',
        title: 'React',
        createdBy: users[0].userName,
        lastEdited: '2020-02-01',
        tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      const result = await postRepository.create(post);
      expect(result._id.toString()).toEqual(
        '4a23c1b5d52a003c98e13f1d',
      );
    });
  });

  describe('deleteByPostId', () => {
    it('should delete the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1a';

      const result = await postRepository.deleteByPostId(postId);

      expect(result.deletedCount).toBe(1);
    });
  });

  describe('updateByPostId', () => {
    it('should update the correct post if post _id matches', async () => {
      const postId = '4a23c1b5d52a003c98e13f1c';

      const post = {
        _id: postId,
        title: 'React',
        createdBy: users[1].userName,
        lastEdited: '2020-02-03',
        tags: ['Babel', 'Webpack', 'React'],
        selectedTags: ['React'],
        content: undefined,
      };

      const result = await postRepository.updateByPostId(postId, post);
      expect(result.nModified).toBe(1);
    });
  });
});
