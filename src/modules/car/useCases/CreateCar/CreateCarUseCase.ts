import { inject, injectable } from 'tsyringe';

import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(data: ICarDTO): Promise<ICarDTO> {
    const licensePlateAlreadyExists =
      await this.carRepository.findByLicensePlate(data.licensePlate);

    if (licensePlateAlreadyExists) {
      throw new AppError('License plate already exists', 422);
    }

    return this.carRepository.save(data);
  }
}
