import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategory } from './FindCategory';

export class FindCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const findCategory = container.resolve(FindCategory);

      res.json(await findCategory.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
