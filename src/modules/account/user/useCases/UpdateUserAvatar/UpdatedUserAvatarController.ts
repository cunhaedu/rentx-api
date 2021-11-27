import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from '@modules/account/user/useCases/UpdateUserAvatar/UpdateUserAvatarUseCase';

export class UpdatedUserAvatarController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const avatar = req.file?.filename as string;
      const { id } = req.token.sub.user;

      const updateUserAvatarUseCase = container.resolve(
        UpdateUserAvatarUseCase,
      );

      await updateUserAvatarUseCase.execute({
        id,
        avatar,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
