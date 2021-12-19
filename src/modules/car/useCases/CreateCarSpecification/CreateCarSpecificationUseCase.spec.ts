import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { InMemoryCarRepository } from '@modules/car/repositories/in-memory/InMemoryCarRepository';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { CreateCarSpecificationUseCase } from '@modules/car/useCases/CreateCarSpecification/CreateCarSpecificationUseCase';
import { InMemorySpecificationRepository } from '@modules/specification/repositories/in-memory/InMemorySpecificationRepository';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import AppError from '@shared/errors/AppError';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemoryCarRepository: ICarRepository;
let inMemorySpecificationRepository: ISpecificationRepository;

describe('Create car specification test suit', () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    inMemorySpecificationRepository = new InMemorySpecificationRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarRepository,
      inMemorySpecificationRepository,
    );
  });

  it('should be able to create new specifications to car', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    const createdCar = await inMemoryCarRepository.save(car);
    const specification = await inMemorySpecificationRepository.save({
      name: 'Car specification name sample',
      description: 'Car specification description sample',
    });

    const carWithSpecification = await createCarSpecificationUseCase.execute({
      id: <string>createdCar.id,
      specificationsIds: [<string>specification.id],
    });

    expect(carWithSpecification).toHaveProperty('specifications');
    expect(carWithSpecification.specifications).toHaveLength(1);
  });

  it('should be able to create a specification to a non-existent car', async () => {
    await expect(async () => {
      await createCarSpecificationUseCase.execute({
        id: 'invalid-id',
        specificationsIds: ['specification'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
