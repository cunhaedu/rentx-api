import { inject, injectable } from 'tsyringe';

import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';
import { IDateProvider } from '@shared/providers/date/IDateProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(data: IRentalDTO): Promise<IRentalDTO> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      <string>data.car.id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const userHasOpenRental = await this.rentalRepository.findOpenRenalByUser(
      <string>data.user.id,
    );

    if (userHasOpenRental) {
      throw new AppError('User already have an open rental!');
    }

    this.validateRentalHours(data.expectedReturnDate);

    return this.rentalRepository.save(data);
  }

  private validateRentalHours(expectedReturnDate: Date): void {
    const minimumRentalHours = 24;

    const currentDate = this.dateProvider.getCurrentDate();
    const rentalHours = this.dateProvider.compare(
      currentDate,
      expectedReturnDate,
      'hours',
    );

    if (rentalHours < minimumRentalHours) {
      throw new AppError(
        'Return car date should have more than 24 hours from start rental date',
      );
    }
  }
}
