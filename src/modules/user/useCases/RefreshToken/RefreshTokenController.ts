import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from '@modules/user/useCases/RefreshToken/RefreshTokenUseCase';

export class RefreshTokenController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token =
        req.body.token || req.headers['x-access-token'] || req.query.token;

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

      res.json(await refreshTokenUseCase.execute(token));
    } catch (error) {
      next(error);
    }
  }
}
