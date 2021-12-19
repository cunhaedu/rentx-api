import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarUseCase } from '@modules/car/useCases/ListAvailableCar/ListAvailableCarUseCase';

export class ListAvailableCarController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { brand, category, name } = req.query;
      const listAvailableCarUseCase = container.resolve(
        ListAvailableCarUseCase,
      );

      res.json(
        await listAvailableCarUseCase.execute({
          name: <string>name,
          brand: <string>brand,
          category: <string>category,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}
