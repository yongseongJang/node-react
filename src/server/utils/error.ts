import { Response } from 'express';

class Errorhandler extends Error {
  public statusCode: number;
  public name: string;
  public message: string;

  constructor();
  constructor(statusCode: number, name: string, message: string);
  constructor(statusCode?: number, name?: string, message?: string) {
    super();
    this.statusCode = statusCode || 500;
    this.name = name || 'Internal server error';
    this.message = message || 'Internal server error';
  }

  public handleError(err: Errorhandler, res: Response) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(err.statusCode).send();
    }

    res.status(err.statusCode).json({
      status: err.statusCode,
      name: err.name,
      message: err.message,
    });
  }
}

export default Errorhandler;
