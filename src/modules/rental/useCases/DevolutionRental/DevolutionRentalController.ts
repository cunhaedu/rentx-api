import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from '@modules/rental/useCases/DevolutionRental/DevolutionRentalUseCase';

export class DevolutionRentalController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.token.sub.user;
      const { rentalId } = req.params;

      const devolutionRentalUseCase = container.resolve(
        DevolutionRentalUseCase,
      );

      res.json(
        await devolutionRentalUseCase.execute({
          rentalId,
          userId: id,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}
