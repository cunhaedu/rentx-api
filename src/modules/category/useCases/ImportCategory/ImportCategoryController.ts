import { NextFunction, Request, Response } from 'express';
import { ImportCategory } from './ImportCategory';

export class ImportCategoryController {
  constructor(private createCategory: ImportCategory) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { file } = req;

      await this.createCategory.execute(file as Express.Multer.File);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
