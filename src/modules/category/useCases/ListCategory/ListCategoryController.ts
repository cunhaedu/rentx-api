import { NextFunction, Request, Response } from 'express';
import { ListCategory } from './ListCategory';

export class ListCategoryController {
  constructor(private listCategory: ListCategory) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await this.listCategory.execute());
    } catch (error) {
      next(error);
    }
  }
}
