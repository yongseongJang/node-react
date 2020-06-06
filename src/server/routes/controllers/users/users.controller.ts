import { Request, Response, NextFunction, RequestHandler } from 'express';
import RequestWithUser from '../../../interfaces/requestWithUser.interface';
import asyncHandler from '../../../utils/asyncHandler';
import UserService from '../../../services/user.service';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public readUserInfoByUserEmail: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const email = req.user.email;

      const result = await this.userService.readUserInfoByUserEmail(email);

      res.status(200).send({ userInfo: result });
    },
  );

  public login: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const result = await this.userService.login(email, password);

      res.status(200).send(result);
    },
  );

  public registerUserInfo: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userInfo = req.body.userInfo;

      await this.userService.registerUserInfo(userInfo);

      res.status(201).send();
    },
  );

  public deleteUserInfoByUserEmail: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const email = req.user.email;

      await this.userService.deleteUserInfoByUserEmail(email);

      res.status(204).send();
    },
  );

  public updateUserInfoByUserEmail: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const email = req.user.email;
      const userInfo = req.body.userInfo;

      await this.userService.updateUserInfoByUserEmail(email, userInfo);

      res.status(204).send();
    },
  );
}

export default UserController;
