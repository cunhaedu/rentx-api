import { InMemoryCategoryRepository } from '@modules/category/repositories/implementations/in-memory/InMemoryCategoryRepository';
import { ListCategory } from '@modules/category/useCases/ListCategory/ListCategory';
import { ListCategoryController } from '@modules/category/useCases/ListCategory/ListCategoryController';

export function makeListCategoryController() {
  const categoryRepository = InMemoryCategoryRepository.getInstance();
  const listCategory = new ListCategory(categoryRepository);
  const listCategoryController = new ListCategoryController(listCategory);

  return listCategoryController;
}
