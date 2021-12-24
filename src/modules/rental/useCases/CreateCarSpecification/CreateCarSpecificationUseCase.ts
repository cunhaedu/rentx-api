import { inject, injectable } from 'tsyringe';

import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import AppError from '@shared/errors/AppError';

interface ICreateCarSpecificationRequest {
  id: string;
  specificationsIds: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,

    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({
    id,
    specificationsIds,
  }: ICreateCarSpecificationRequest): Promise<ICarDTO> {
    const car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found', 422);
    }

    const specifications = await this.specificationRepository.findByIds(
      specificationsIds,
    );

    return this.carRepository.save({ ...car, specifications });
  }
}
