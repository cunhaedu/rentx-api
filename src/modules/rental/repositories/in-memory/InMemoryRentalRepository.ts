import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { Rental } from '@modules/rental/infra/typeorm/entities/Rental';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';

export class InMemoryRentalRepository implements IRentalRepository {
  private readonly rentals: IRentalDTO[];

  constructor() {
    this.rentals = [];
  }

  async save(data: IRentalDTO): Promise<IRentalDTO> {
    const rental = new Rental();

    Object.assign(rental, {
      startDate: new Date(),
      expectedReturnDate: data.expectedReturnDate,
      car: data.car,
      user: data.user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async findById(id: string): Promise<IRentalDTO | undefined> {
    return this.rentals.find(rental => rental.id === id);
  }

  async findOpenRenalByUser(id: string): Promise<IRentalDTO | undefined> {
    return this.rentals.find(
      rental => rental.user.id === id && !rental.endDate,
    );
  }

  async findOpenRentalByCar(id: string): Promise<IRentalDTO | undefined> {
    return this.rentals.find(rental => rental.car.id === id && !rental.endDate);
  }

  async listByUser(user: string): Promise<IRentalDTO[]> {
    return this.rentals.filter(rental => rental.user.id === user);
  }
}
