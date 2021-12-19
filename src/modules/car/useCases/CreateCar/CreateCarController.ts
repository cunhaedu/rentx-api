import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from '@modules/car/useCases/CreateCar/CreateCarUseCase';

export class CreateCarController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        name,
        description,
        brand,
        dailyRate,
        licensePlate,
        fineAmount,
        category,
      } = req.body;

      const createCarUseCase = container.resolve(CreateCarUseCase);
      const car = await createCarUseCase.execute({
        name,
        description,
        brand,
        dailyRate,
        licensePlate,
        fineAmount,
        category,
      });

      res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  }
}
