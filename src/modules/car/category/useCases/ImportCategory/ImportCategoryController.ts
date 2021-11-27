import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export class ImportCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { file } = req;

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      await importCategoryUseCase.execute(file as Express.Multer.File);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
