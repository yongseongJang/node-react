import { Response } from 'express';

class Errorhandler extends Error {
  public statusCode: number;
  public name: string;
  public message: string;

  constructor(statusCode: number, name: string, message: string) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
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
