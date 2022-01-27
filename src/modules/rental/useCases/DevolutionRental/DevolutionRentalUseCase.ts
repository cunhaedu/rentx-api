import { inject, injectable } from 'tsyringe';

import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';
import { IDateProvider } from '@shared/providers/date/IDateProvider';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import AppError from '@shared/errors/AppError';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';

interface IRequest {
  rentalId: string;
  userId: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ rentalId }: IRequest): Promise<IRentalDTO> {
    const currentDate = this.dateProvider.getCurrentDate();
    const minimumDaily = 1;

    const rental = await this.rentalRepository.findById(rentalId);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    let daily = this.dateProvider.compare(
      rental.startDate,
      currentDate,
      'days',
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compare(
      rental.expectedReturnDate,
      currentDate,
      'days',
    );

    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * rental.car.fineAmount;

      total += calculateFine;
    }

    total += daily * rental.car.dailyRate;

    rental.endDate = currentDate;
    rental.total = total;

    await this.rentalRepository.save(rental);
    await this.carRepository.update(<string>rental.car.id, {
      available: true,
    } as ICarDTO);

    return rental;
  }
}
