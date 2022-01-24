import {
  ICarRepository,
  IFindAvailableCarsOptions,
} from '@modules/car/repositories/ICarRepository';
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
      specifications: data.specifications,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.cars.push(car);
    return car;
  }

  async findById(id: string): Promise<ICarDTO | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async findAvailable(options?: IFindAvailableCarsOptions): Promise<ICarDTO[]> {
    let availableCars = this.cars.filter(car => car.available);

    if (options && (options.name || options.brand || options.category)) {
      availableCars = availableCars.filter(
        car =>
          (options.name && car.name === options.name) ||
          (options.brand && car.brand === options.brand) ||
          (options.category && car.category?.id === options.category),
      );
    }

    return availableCars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async update(id: string, data: ICarDTO): Promise<void> {
    this.cars = this.cars.map(car => {
      return car.id === id ? { id, ...data, ...car } : car;
    });
  }
}
