import { InMemoryCategoryRepository } from '@modules/category/repositories/implementations/in-memory/InMemoryCategoryRepository';
import { FindCategory } from '@modules/category/useCases/FindCategory/FindCategory';
import { FindCategoryController } from '@modules/category/useCases/FindCategory/FindCategoryController';

export function makeFindCategoryController() {
  const categoryRepository = InMemoryCategoryRepository.getInstance();
  const findCategory = new FindCategory(categoryRepository);
  const findCategoryController = new FindCategoryController(findCategory);

  return findCategoryController;
}
