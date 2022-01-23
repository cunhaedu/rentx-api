import { inject, injectable } from 'tsyringe';

import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';

@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
  ) {}

  async execute(user: string): Promise<IRentalDTO[]> {
    return this.rentalRepository.listByUser(user);
  }
}
