import { getRepository, IsNull, Repository } from 'typeorm';

import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { Rental } from '@modules/rental/infra/typeorm/entities/Rental';

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.repository.findOne(id, {
      relations: ['user', 'car'],
    });
  }

  async findOpenRenalByUser(id: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      relations: ['user', 'car'],
      where: { user: { id }, endDate: IsNull() },
    });
  }

  async findOpenRentalByCar(id: string): Promise<Rental | undefined> {
    return this.repository.findOne({
      relations: ['user', 'car'],
      where: { car: { id }, endDate: IsNull() },
    });
  }

  async save(data: Rental): Promise<Rental> {
    const rental = this.repository.create(data);
    return this.repository.save(rental);
  }

  async listByUser(user: string): Promise<Rental[]> {
    return this.repository.find({
      relations: ['car'],
      where: { user: { id: user } },
    });
  }
}
