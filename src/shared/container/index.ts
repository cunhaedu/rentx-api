import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/car/category/repositories/ICategoryRepository';
import { TypeormCategoryRepository } from '@modules/car/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { ISpecificationRepository } from '@modules/car/specification/repositories/ISpecificationRepository';
import { TypeormSpecificationRepository } from '@modules/car/specification/repositories/implementations/typeorm/TypeormSpecificationRepository';
import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import { TypeormUserRepository } from '@modules/account/user/repositories/implementations/typeorm/TypeormUserRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  TypeormCategoryRepository,
);
container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  TypeormSpecificationRepository,
);
container.registerSingleton<IUserRepository>(
  'UserRepository',
  TypeormUserRepository,
);
