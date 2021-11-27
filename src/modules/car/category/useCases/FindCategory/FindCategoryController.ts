import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategoryUseCase } from './FindCategoryUseCase';

export class FindCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const findCategoryUseCase = container.resolve(FindCategoryUseCase);

      res.json(await findCategoryUseCase.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
