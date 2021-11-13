import { NextFunction, Request, Response } from 'express';
import { FindSpecification } from './FindSpecification';

export class FindSpecificationController {
  constructor(private findSpecification: FindSpecification) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      res.json(await this.findSpecification.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
