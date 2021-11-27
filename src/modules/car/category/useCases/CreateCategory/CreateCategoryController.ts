import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICategoryDTO } from '@modules/car/category/dtos/ICategoryDTO';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const category = await createCategoryUseCase.execute({
        name,
        description,
      } as ICategoryDTO);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
}
