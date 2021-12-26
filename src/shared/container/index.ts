import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/category/infra/typeorm/repositories/CategoryRepository';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/specification/infra/typeorm/repositories/SpecificationRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { CarImageRepository } from '@modules/car/infra/typeorm/repositories/CarImageRepository';
import { ICarImageRepository } from '@modules/car/repositories/ICarImageRepository';
import { IRentalRepository } from '@modules/rental/repositories/IRentalRepository';
import { RentalRepository } from '@modules/rental/infra/typeorm/repositories/RentalRepository';
import { IDateProvider } from '@shared/providers/date/IDateProvider';
import { DayJsDateProvider } from '@shared/providers/date/implementations/DayJsDateProvider';

// Repositories
container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ICarRepository>('CarRepository', CarRepository);
container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository,
);
container.registerSingleton<IRentalRepository>(
  'RentalRepository',
  RentalRepository,
);

// Providers
container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);
