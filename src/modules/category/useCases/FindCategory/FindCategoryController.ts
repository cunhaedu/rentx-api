import { NextFunction, Request, Response } from 'express';
import { FindCategory } from './FindCategory';

export class FindCategoryController {
  constructor(private listCategory: FindCategory) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      res.json(await this.listCategory.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
