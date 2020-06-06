import {
  Request,
  Response,
  NextFunction,
  Application,
  static as expressStatic,
} from 'express';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import ErrorHandler from '../utils/error';

import * as morgan from 'morgan';
import logger from '../utils/logger';

import ApiRouter from '../routes/index';

import ssr from './ssr';

class ExpressLoader {
  private app: Application;
  private errorHandler: ErrorHandler;

  constructor(app: Application) {
    this.app = app;
    this.errorHandler = new ErrorHandler();
  }

  public init() {
    this.app.use(expressStatic(join(__dirname, '../../../dist')));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(
      morgan('common', {
        skip: (req: Request, res: Response): boolean => {
          return res.statusCode >= 400;
        },
        stream: process.stdout,
      }),
    );

    this.app.use(
      morgan('common', {
        skip: (req: Request, res: Response): boolean => {
          return res.statusCode < 400;
        },
        stream: process.stderr,
      }),
    );

    new ApiRouter(this.app);

    this.app.get('/*', ssr);

    this.app.use(
      (
        err: Error | ErrorHandler,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        logger.error(err);
        next(err);
      },
    );

    this.app.use(
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        this.errorHandler.handleError(err, res);
      },
    );
  }
}

export default ExpressLoader;
