import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/category/infra/typeorm/repositories/CategoryRepository';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/specification/infra/typeorm/repositories/SpecificationRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
