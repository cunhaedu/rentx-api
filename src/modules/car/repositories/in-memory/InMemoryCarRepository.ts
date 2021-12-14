import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

export class InMemoryCarRepository implements ICarRepository {
  private cars: ICarDTO[];

  constructor() {
    this.cars = [];
  }

  async save(data: ICarDTO): Promise<ICarDTO> {
    const car = new Car();

    Object.assign(car, {
      name: data.name,
      description: data.description,
      dailyRate: data.dailyRate,
      licensePlate: data.licensePlate,
      fineAmount: data.fineAmount,
      brand: data.brand,
      category: data.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }
}
