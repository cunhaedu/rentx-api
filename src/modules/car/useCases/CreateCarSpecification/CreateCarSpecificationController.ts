import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from '@modules/car/useCases/CreateCarSpecification/CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { specificationsIds } = req.body;

      const createCarUseCase = container.resolve(CreateCarSpecificationUseCase);

      res.json(await createCarUseCase.execute({ id, specificationsIds }));
    } catch (error) {
      next(error);
    }
  }
}
