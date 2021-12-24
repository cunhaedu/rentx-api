import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@modules/car/repositories/in-memory/InMemoryCarRepository';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ListAvailableCarUseCase } from '@modules/car/useCases/ListAvailableCar/ListAvailableCarUseCase';

let listCarUseCase: ListAvailableCarUseCase;
let inMemoryCarRepository: ICarRepository;

describe('List car test suit', () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    listCarUseCase = new ListAvailableCarUseCase(inMemoryCarRepository);
  });

  it('should be able to list all available cars', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute();

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by name', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      name: 'Hilux',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars with unregistered name', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      name: 'Audi 21',
    });

    expect(cars).toHaveLength(0);
  });

  it('should be able to list all available cars by brand', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      brand: 'Toyota',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars with unregistered brand', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toHaveLength(0);
  });

  it('should be able to list all available cars with unregistered name', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      name: 'Audi 21',
    });

    expect(cars).toHaveLength(0);
  });

  it('should be able to list all available cars by brand', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      category: 'category',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars with unregistered category', async () => {
    const car: ICarDTO = {
      name: 'Hilux',
      description: 'Hilux CD SR5 4x4 2.8 Diesel',
      brand: 'Toyota',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      category: { id: 'category' } as ICategoryDTO,
    };

    await inMemoryCarRepository.save(car);

    const cars = await listCarUseCase.execute({
      category: 'Unregistered category',
    });

    expect(cars).toHaveLength(0);
  });
});
