import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalByUserUseCase } from '@modules/rental/useCases/ListRentalByUser/ListRentalByUserUseCase';

export class ListRentalByUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.token.sub.user;

      const listRentalByUserUseCase = container.resolve(
        ListRentalByUserUseCase,
      );

      res.json(await listRentalByUserUseCase.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
