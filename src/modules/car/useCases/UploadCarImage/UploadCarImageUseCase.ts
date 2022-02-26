import { inject, injectable } from 'tsyringe';

import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import AppError from '@shared/errors/AppError';
import { ICarImageRepository } from '@modules/car/repositories/ICarImageRepository';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';

interface IUploadCarImageRequest {
  id: string;
  images: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,

    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
  ) {}

  async execute({ id, images }: IUploadCarImageRequest): Promise<void> {
    const car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError('Car not found!', 422);
    }

    images.forEach(name => {
      this.carImageRepository.save({ name, car: { id } as ICarDTO });
    });
  }
}
