import { Router } from 'express';
import UserController from '../../controllers/users/users.controller';
import authentication from '../../middlewares/authentication';

class UserRouter {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/:email',
      authentication,
      this.controller.readUserInfoByUserEmail,
    );

    this.router.post('/login', this.controller.login);

    this.router.post('/', this.controller.registerUserInfo);

    this.router.delete(
      '/:email',
      authentication,
      this.controller.deleteUserInfoByUserEmail,
    );

    this.router.put(
      '/:email',
      authentication,
      this.controller.updateUserInfoByUserEmail,
    );
  }
}

export default new UserRouter().router;
