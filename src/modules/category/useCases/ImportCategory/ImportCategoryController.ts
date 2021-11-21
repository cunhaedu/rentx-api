import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategory } from './ImportCategory';

export class ImportCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { file } = req;

      const importCategory = container.resolve(ImportCategory);
      await importCategory.execute(file as Express.Multer.File);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
