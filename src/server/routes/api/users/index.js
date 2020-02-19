const usersRouter = require('express').Router();
const controller = require('../../controllers/users/users.controller');
const authentication = require('../../middlewares/authentication');

usersRouter.get('/:email', authentication, controller.readUserInfoByUserEmail);

usersRouter.post('/login', controller.login);

usersRouter.post('/', controller.registerUserInfo);

usersRouter.delete(
  '/:email',
  authentication,
  controller.deleteUserInfoByUserEmail,
);

usersRouter.put(
  '/:email',
  authentication,
  controller.updateUserInfoByUserEmail,
);

module.exports = usersRouter;
