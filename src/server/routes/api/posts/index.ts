import { Router } from 'express';
import PostController from '../../controllers/posts/posts.controller';
import authentication from '../../middlewares/authentication';

class PostRouter {
  public router: Router;
  private controller: PostController;

  constructor() {
    this.router = Router();
    this.controller = new PostController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authentication, this.controller.readByUser);

    this.router.get('/:id', authentication, this.controller.readByPostId);

    this.router.post('/', authentication, this.controller.create);

    this.router.delete('/:id', authentication, this.controller.deleteByPostId);

    this.router.put('/:id', authentication, this.controller.updateByPostId);
  }
}

export default new PostRouter().router;
