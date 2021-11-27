import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryUseCase } from './ListCategoryUseCase';

export class ListCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listCategoryUseCase = container.resolve(ListCategoryUseCase);
      res.json(await listCategoryUseCase.execute());
    } catch (error) {
      next(error);
    }
  }
}
