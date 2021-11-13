import { NextFunction, Request, Response } from 'express';
import { ListSpecification } from './ListSpecification';

export class ListSpecificationController {
  constructor(private listSpecification: ListSpecification) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await this.listSpecification.execute());
    } catch (error) {
      next(error);
    }
  }
}
