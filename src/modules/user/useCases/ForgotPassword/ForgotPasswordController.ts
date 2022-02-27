import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase);

      res.json(await forgotPasswordUseCase.execute(email));
    } catch (error) {
      next(error);
    }
  }
}
