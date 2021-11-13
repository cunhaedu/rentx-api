import { NextFunction, Request, Response } from 'express';
import { CreateCategory } from './CreateCategory';

export class CreateCategoryController {
  constructor(private createCategory: CreateCategory) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body;

      res
        .status(201)
        .json(await this.createCategory.execute({ name, description }));
    } catch (error) {
      next(error);
    }
  }
}
