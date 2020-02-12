const postsRouter = require('express').Router();
const controller = require('../../controllers/posts/posts.controller');

postsRouter.get('/', controller.readByUser);

postsRouter.get('/:id', controller.readByPostId);

postsRouter.post('/', controller.create);

postsRouter.delete('/:id', controller.deleteByPostId);

postsRouter.put('/:id', controller.updateByPostId);

module.exports = postsRouter;
