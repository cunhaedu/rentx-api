import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const category = await createCategoryUseCase.execute({
        name,
        description,
      });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
}
