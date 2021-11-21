import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { TypeormCategoryRepository } from '@modules/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import { TypeormSpecificationRepository } from '@modules/specification/repositories/implementations/typeorm/TypeormSpecificationRepository';

container.registerSingleton<ICategoryRepository>('CategoryRepository', TypeormCategoryRepository);
container.registerSingleton<ISpecificationRepository>('SpecificationRepository', TypeormSpecificationRepository);
