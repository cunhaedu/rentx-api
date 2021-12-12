import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/car/category/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/car/category/infra/typeorm/repositories/CategoryRepository';
import { ISpecificationRepository } from '@modules/car/specification/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/car/specification/infra/typeorm/repositories/SpecificationRepository';
import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import { UserRepository } from '@modules/account/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
