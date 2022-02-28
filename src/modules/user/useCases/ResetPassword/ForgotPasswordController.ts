import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password } = req.body;
      const { token } = req.query;

      const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

      res.json(
        await resetPasswordUseCase.execute({ password, token: <string>token }),
      );
    } catch (error) {
      next(error);
    }
  }
}
