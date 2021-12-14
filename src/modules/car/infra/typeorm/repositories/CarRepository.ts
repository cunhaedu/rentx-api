import { getRepository, Repository } from 'typeorm';

import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }

  save(data: Car): Promise<Car> {
    const car = this.repository.create(data);
    return this.repository.save(car);
  }
}
