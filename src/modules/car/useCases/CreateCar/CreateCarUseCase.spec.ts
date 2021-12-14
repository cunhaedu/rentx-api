import { CreateCarUseCase } from '@modules/car/useCases/CreateCar/CreateCarUseCase';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { InMemoryCarRepository } from '@modules/car/repositories/in-memory/InMemoryCarRepository';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import AppError from '@shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let inMemoryCarRepository: InMemoryCarRepository;

describe('Create car test suit', () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarRepository);
  });

  it('should be able to create a new car', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');

    expect(createdCar).toEqual(
      expect.objectContaining({
        name: 'Hilux',
        description: 'Hilux CD SR5 4x4 2.8 Diesel',
        brand: 'Toyota',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        category: expect.objectContaining({
          id: 'category',
        }),
      }),
    );
  });

  it('should not be able to create a car with an existent license plate', async () => {
    await expect(async () => {
      const car: ICarDTO = {
        name: 'Hilux',
        description: 'Hilux CD SR5 4x4 2.8 Diesel',
        brand: 'Toyota',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        category: { id: 'category' } as ICategoryDTO,
      };

      await createCarUseCase.execute(car);

      const car2: ICarDTO = {
        name: 'Hilux',
        description: 'Hilux CD SR5 4x4 2.8 Diesel',
        brand: 'Toyota',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        category: { id: 'category' } as ICategoryDTO,
      };

      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with available true by default', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBeTruthy();
  });
});
