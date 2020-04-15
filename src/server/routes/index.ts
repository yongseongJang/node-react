import { Application } from 'express';
import userRouter from './api/users/index';

class ApiRouter {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
    this.init();
  }

  private init(): void {
    // this.app.use('/api/posts', require('./api/posts'));
    this.app.use('/api/users', userRouter);
  }
}

export default ApiRouter;
