const postsRouter = require('express').Router();
const controller = require('../../controllers/posts/posts.controller');
const authentication = require('../../middlewares/authentication');

postsRouter.get('/', authentication, controller.readByUser);

postsRouter.get('/:id', authentication, controller.readByPostId);

postsRouter.post('/', authentication, controller.create);

postsRouter.delete('/:id', authentication, controller.deleteByPostId);

postsRouter.put('/:id', authentication, controller.updateByPostId);

module.exports = postsRouter;
