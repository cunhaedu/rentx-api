import { InMemoryCategoryRepository } from '@modules/category/repositories/implementations/in-memory/InMemoryCategoryRepository';
import { CreateCategory } from '@modules/category/useCases/CreateCategory/CreateCategory';
import { CreateCategoryController } from '@modules/category/useCases/CreateCategory/CreateCategoryController';

export function makeCreateCategoryController() {
  const categoryRepository = InMemoryCategoryRepository.getInstance();
  const createCategory = new CreateCategory(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);

  return createCategoryController;
}
