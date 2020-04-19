import { Response, NextFunction, RequestHandler } from 'express';
import RequestWithUser from '../../../interfaces/requestWithUser.interface';
import asyncHandler from '../../../utils/asyncHandler';
import PostService from '../../../services/post.service';

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public readByUser: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const email = req.user.email;

      const result = await this.postService.readByUser(email);

      res.status(200).send(result);
    },
  );

  readByPostId: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const postId = req.params.postId;

      const result = await this.postService.readByPostId(postId);

      res.status(200).send(result);
    },
  );

  create: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const post = req.body.post;

      const result = await this.postService.create(post);

      res.status(201).send(result);
    },
  );

  deleteByPostId: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const postId = req.params.postId;

      const result = await this.postService.deleteByPostId(postId);

      res.status(204).send();
    },
  );

  updateByPostId: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const postId = req.params.postId;
      const post = req.body.post;

      const result = await this.postService.updateByPostId(postId, post);

      res.status(200).send();
    },
  );
}

export default PostController;
