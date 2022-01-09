import dayjs from 'dayjs';

import { CreateRentalUseCase } from '@modules/rental/useCases/CreateRental/CreateRentalUseCase';
import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { InMemoryRentalRepository } from '@modules/rental/repositories/in-memory/InMemoryRentalRepository';
import { InMemoryCarRepository } from '@modules/car/repositories/in-memory/InMemoryCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IDateProvider } from '@shared/providers/date/IDateProvider';
import { DayJsDateProvider } from '@shared/providers/date/implementations/DayJsDateProvider';
import AppError from '@shared/errors/AppError';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalRepository: IRentalRepository;
let inMemoryCarRepository: ICarRepository;
let dayJsDateProvider: IDateProvider;

describe('Create rental test suit', () => {
  const currentDateWithOneMoreDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository();
    inMemoryCarRepository = new InMemoryCarRepository();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalRepository,
      inMemoryCarRepository,
      dayJsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = {
      expectedReturnDate: currentDateWithOneMoreDay,
      car: { id: 'car' } as ICarDTO,
      user: { id: 'user' } as IUserDTO,
    } as IRentalDTO;

    const createdRental = await createRentalUseCase.execute(rental);

    expect(createdRental).toHaveProperty('id');
    expect(createdRental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another rental open to the same user', async () => {
    await expect(async () => {
      const rental = {
        expectedReturnDate: currentDateWithOneMoreDay,
        car: { id: 'car' } as ICarDTO,
        user: { id: 'user' } as IUserDTO,
      } as IRentalDTO;

      const invalidRental = {
        expectedReturnDate: currentDateWithOneMoreDay,
        car: { id: 'another_car' } as ICarDTO,
        user: { id: 'user' } as IUserDTO,
      } as IRentalDTO;

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(invalidRental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another rental open to the same car', async () => {
    await expect(async () => {
      const rental = {
        expectedReturnDate: currentDateWithOneMoreDay,
        car: { id: 'car' } as ICarDTO,
        user: { id: 'user' } as IUserDTO,
      } as IRentalDTO;

      const invalidRental = {
        expectedReturnDate: currentDateWithOneMoreDay,
        car: { id: 'car' } as ICarDTO,
        user: { id: 'another_user' } as IUserDTO,
      } as IRentalDTO;

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(invalidRental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(async () => {
      const rental = {
        expectedReturnDate: dayjs().toDate(),
        car: { id: 'car' } as ICarDTO,
        user: { id: 'user' } as IUserDTO,
      } as IRentalDTO;

      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
