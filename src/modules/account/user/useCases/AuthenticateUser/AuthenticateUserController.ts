import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@modules/account/user/useCases/AuthenticateUser/AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase,
      );

      const authenticateInfo = await authenticateUserUseCase.execute({
        email,
        password,
      });

      res.json(authenticateInfo);
    } catch (error) {
      next(error);
    }
  }
}
