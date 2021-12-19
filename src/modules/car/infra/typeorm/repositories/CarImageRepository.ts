import { getRepository, Repository } from 'typeorm';

import { ICarImageRepository } from '@modules/car/repositories/ICarImageRepository';
import { CarImage } from '@modules/car/infra/typeorm/entities/CarImage';

export class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async save(data: CarImage): Promise<CarImage> {
    const carImage = this.repository.create(data);
    return this.repository.save(carImage);
  }
}
