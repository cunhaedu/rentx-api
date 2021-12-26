import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from '@modules/rental/useCases/CreateRental/CreateRentalUseCase';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';

export class CreateRentalController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = req.token.sub;
      const { expectedReturnDate, car } = req.body;

      const createRentalUseCase = container.resolve(CreateRentalUseCase);
      const rental = await createRentalUseCase.execute({
        expectedReturnDate,
        car,
        user,
      } as IRentalDTO);

      res.status(201).json(rental);
    } catch (error) {
      next(error);
    }
  }
}
