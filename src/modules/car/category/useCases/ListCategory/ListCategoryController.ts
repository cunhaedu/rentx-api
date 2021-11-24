import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategory } from './ListCategory';

export class ListCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listCategory = container.resolve(ListCategory);
      res.json(await listCategory.execute());
    } catch (error) {
      next(error);
    }
  }
}
