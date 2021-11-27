import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ISpecificationDTO } from '@modules/car/specification/dtos/ISpecificationDTO';
import { CreateSpecificationUseCase } from '@modules/car/specification/useCases/CreateSpecification/CreateSpecificationUseCase';

export class CreateSpecificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );

      const specification = await createSpecificationUseCase.execute({
        name,
        description,
      } as ISpecificationDTO);

      res.status(201).json(specification);
    } catch (error) {
      next(error);
    }
  }
}
