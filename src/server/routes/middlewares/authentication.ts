import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import Errorhandler from '../../utils/error';
import { Response, NextFunction, RequestHandler } from 'express';
import { RequestWithUser, User } from '../../interfaces';

dotenv.config();

const authentication: RequestHandler = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.PRIVATEKEY, (err: any, user: User) => {
      if (err) {
        return next(new Errorhandler(401, 'ValidationError', 'Invalid token'));
      }

      req.user = user;
      return next();
    });
  } else {
    return next(
      new Errorhandler(401, 'ValidationError', 'No exist authHeader'),
    );
  }
};

export default authentication;
