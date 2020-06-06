import { Response, NextFunction, RequestHandler } from 'express';
import { RequestWithUser } from '../interfaces';

const asyncHandler = (fn: Function): RequestHandler => (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
