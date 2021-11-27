import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationUseCase } from './ListSpecificationUseCase';

export class ListSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listSpecificationUseCase = container.resolve(
        ListSpecificationUseCase,
      );

      res.json(await listSpecificationUseCase.execute());
    } catch (error) {
      next(error);
    }
  }
}
