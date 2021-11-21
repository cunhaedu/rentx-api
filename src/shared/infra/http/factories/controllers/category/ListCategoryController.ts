import { TypeormCategoryRepository } from '@modules/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { ListCategory } from '@modules/category/useCases/ListCategory/ListCategory';
import { ListCategoryController } from '@modules/category/useCases/ListCategory/ListCategoryController';

export function makeListCategoryController(): ListCategoryController {
  const categoryRepository = new TypeormCategoryRepository();
  const listCategory = new ListCategory(categoryRepository);
  const listCategoryController = new ListCategoryController(listCategory);

  return listCategoryController;
}
