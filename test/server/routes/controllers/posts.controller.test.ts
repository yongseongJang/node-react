import PostController from '../../../../src/server/routes/controllers/posts/posts.controller';
import { Response, NextFunction } from 'express';
import { RequestWithUser, User as IUser } from '../../../../src/server/interfaces';


describe('post controller unit test', () => {
  const postController = new PostController();

  describe('readByUser', () => {
    it('should response 200 if PostService readByUser operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@naver.com' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].readByUser = jest.fn();

      await postController.readByUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if PostService readByUser throw error', async () => {
      const req = {} as RequestWithUser;
      req.user = { email: 'test@naver.com' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].readByUser = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(postController.readByUser(req, res, next)).rejects.toThrow();
    });
  });

  describe('readByPostId', () => {
    it('should response 200 if PostService readByPostId operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].readByPostId = jest.fn();

      await postController.readByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if PostService readByPostId throw error', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].readByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(postController.readByPostId(req, res, next)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should response 201 if PostService create operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.body = {
        post: {
          _id: '4a23c1b5d52a003c98e13f1e',
          title: 'React',
          createdBy: {} as IUser,
          lastEdited: new Date('2020-04-19'),
          tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
          selectedTags: ['React'],
          content: undefined,
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].create = jest.fn();

      await postController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should throw error if PostService create throw error', async () => {
      const req = {} as RequestWithUser;
      req.body = {
        post: {
          _id: '4a23c1b5d52a003c98e13f1e',
          title: 'React',
          createdBy: {} as IUser,
          lastEdited: 'a day ago',
          tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
          selectedTags: ['React'],
          content: undefined,
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].create = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(postController.create(req, res, next)).rejects.toThrow();
    });
  });

  describe('deleteByPostId', () => {
    it('should response 204 if PostService deleteByPostId operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].deleteByPostId = jest.fn();

      await postController.deleteByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if PostService deleteByPostId throw error', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].deleteByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(postController.deleteByPostId(req, res, next)).rejects.toThrow();
    });
  });

  describe('updateByPostId', () => {
    it('should response 200 if PostService updateByPostId operated correctly', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      req.body = {
        post: {
          _id: '4a23c1b5d52a003c98e13f1e',
          title: 'React',
          createdBy: {} as IUser,
          lastEdited: new Date('2020-04-19'),
          tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
          selectedTags: ['React'],
          content: undefined,
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].updateByPostId = jest.fn();

      await postController.updateByPostId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should throw error if PostService updatebyPostId throw error', async () => {
      const req = {} as RequestWithUser;
      req.params = { _id: '5a23c1b5d52a003c98e13f1a' };
      req.body = {
        post: {
          _id: '4a23c1b5d52a003c98e13f1e',
          title: 'React',
          createdBy: {} as IUser,
          lastEdited: 'a day ago ',
          tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
          selectedTags: ['React'],
          content: undefined,
        },
      };
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      const next: NextFunction = {} as NextFunction;

      postController['postService'].updateByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(postController.updateByPostId(req, res, next)).rejects.toThrow();
    });
  });
});
