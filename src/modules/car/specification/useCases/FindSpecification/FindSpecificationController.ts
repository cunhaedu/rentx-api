import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindSpecification } from './FindSpecification';

export class FindSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const findSpecification = container.resolve(FindSpecification);

      res.json(await findSpecification.execute(id));
    } catch (error) {
      next(error);
    }
  }
}
