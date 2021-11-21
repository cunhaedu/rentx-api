import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecification } from './ListSpecification';

export class ListSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listSpecification = container.resolve(ListSpecification);

      res.json(await listSpecification.execute());
    } catch (error) {
      next(error);
    }
  }
}
