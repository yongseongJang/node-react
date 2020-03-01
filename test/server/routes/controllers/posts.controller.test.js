const async = require('async');
const PostController = require('../../../../src/server/routes/controllers/posts/posts.controller');
const PostService = require('../../../../src/server/services/post.service');

describe('post controller unit test', () => {
  describe('readByUser', () => {
    it('should response 200 if PostService readByUser operated correctly', async () => {
      const req = {
        data: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.readByUser = jest.fn();

      await PostController.readByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if PostService readByUser throw error', async () => {
      const req = {
        data: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.readByUser = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(PostController.readByUser(req, res)).rejects.toThrow();
    });
  });

  describe('readByPostId', () => {
    it('should response 200 if PostService readByPostId operated correctly', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.readByPostId = jest.fn();

      await PostController.readByPostId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should throw error if PostService readByPostId throw error', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.readByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(PostController.readByPostId(req, res)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should response 201 if PostService create operated correctly', async () => {
      const req = {
        body: {
          post: {
            _id: '4a23c1b5d52a003c98e13f1e',
            title: 'React',
            createdBy: '5a23c1b5d52a003c98e13f1a',
            lastEdited: 'a day ago',
            tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
            selectedTags: ['React'],
            content: undefined,
          },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.create = jest.fn();

      await PostController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should throw error if PostService create throw error', async () => {
      const req = {
        body: {
          post: {
            _id: '4a23c1b5d52a003c98e13f1e',
            title: 'React',
            createdBy: '5a23c1b5d52a003c98e13f1a',
            lastEdited: 'a day ago',
            tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
            selectedTags: ['React'],
            content: undefined,
          },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.create = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(PostController.create(req, res)).rejects.toThrow();
    });
  });

  describe('deleteByPostId', () => {
    it('should response 204 if PostService deleteByPostId operated correctly', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.deleteByPostId = jest.fn();

      await PostController.deleteByPostId(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
    it('should throw error if PostService deleteByPostId throw error', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.deleteByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(PostController.deleteByPostId(req, res)).rejects.toThrow();
    });
  });

  describe('updateByPostId', () => {
    it('should response 200 if PostService updateByPostId operated correctly', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
        body: {
          post: {
            _id: '4a23c1b5d52a003c98e13f1e',
            title: 'React',
            createdBy: '5a23c1b5d52a003c98e13f1a',
            lastEdited: '2010-02-20',
            tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
            selectedTags: ['React'],
            content: undefined,
          },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.updateByPostId = jest.fn();

      await PostController.updateByPostId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should throw error if PostService updatebyPostId throw error', async () => {
      const req = {
        params: { _id: '5a23c1b5d52a003c98e13f1a' },
        body: {
          post: {
            _id: '4a23c1b5d52a003c98e13f1e',
            title: 'React',
            createdBy: '5a23c1b5d52a003c98e13f1a',
            lastEdited: 'a day ago',
            tags: ['Babel', 'Webpack', 'NodeJS', 'React'],
            selectedTags: ['React'],
            content: undefined,
          },
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      PostService.updateByPostId = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(PostController.updateByPostId(req, res)).rejects.toThrow();
    });
  });
});
