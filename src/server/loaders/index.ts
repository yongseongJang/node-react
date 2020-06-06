import { Application } from 'express';
import MongooseLoader from './mongoose';
import ExpressLoaders from './express';

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public async config() {
    await new MongooseLoader().init();
    new ExpressLoaders(this.app).init();
  }
}

export default Loader;
