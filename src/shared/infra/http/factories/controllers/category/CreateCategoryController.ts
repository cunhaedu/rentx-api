import { TypeormCategoryRepository } from '@modules/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { CreateCategory } from '@modules/category/useCases/CreateCategory/CreateCategory';
import { CreateCategoryController } from '@modules/category/useCases/CreateCategory/CreateCategoryController';

export function makeCreateCategoryController(): CreateCategoryController {
  const categoryRepository = new TypeormCategoryRepository();
  const createCategory = new CreateCategory(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);

  return createCategoryController;
}
