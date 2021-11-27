import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindSpecificationUseCase } from './FindSpecificationUseCase';

export class FindSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const findSpecificationUseCase = container.resolve(
        FindSpecificationUseCase,
      );

      res.json(await findSpecificationUseCase.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
