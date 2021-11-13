import { NextFunction, Request, Response } from 'express';
import { CreateSpecification } from './CreateSpecification';

export class CreateSpecificationController {
  constructor(private createSpecification: CreateSpecification) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description } = req.body;

      const specification = await this.createSpecification.execute({
        name,
        description,
      });

      res.status(201).json(specification);
    } catch (error) {
      next(error);
    }
  }
}
