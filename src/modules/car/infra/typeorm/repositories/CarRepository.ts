import { getRepository, Repository } from 'typeorm';

import {
  ICarRepository,
  IFindAvailableCarsOptions,
} from '@modules/car/repositories/ICarRepository';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({ licensePlate });
  }

  async findById(id: string): Promise<ICarDTO | undefined> {
    return this.repository.findOne(id, {
      relations: ['specifications'],
    });
  }

  async findAvailable({
    brand,
    name,
    category,
  }: IFindAvailableCarsOptions): Promise<ICarDTO[]> {
    const query = this.repository
      .createQueryBuilder('car')
      .innerJoinAndSelect('car.category', 'category')
      .where('car.available = :available', { available: true });

    if (name) {
      query.andWhere('car.name = :name', { name });
    }
    if (brand) {
      query.andWhere('car.brand = :brand', { brand });
    }
    if (category) {
      query.andWhere('car.category.id = :category', { category });
    }

    return query.getMany();
  }

  async save(data: Car): Promise<Car> {
    const car = this.repository.create(data);
    return this.repository.save(car);
  }

  async update(id: string, data: Car): Promise<void> {
    await this.repository.update(id, data);
  }
}
