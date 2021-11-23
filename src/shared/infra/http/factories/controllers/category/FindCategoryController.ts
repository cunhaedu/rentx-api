import { TypeormCategoryRepository } from '@modules/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { FindCategory } from '@modules/category/useCases/FindCategory/FindCategory';
import { FindCategoryController } from '@modules/category/useCases/FindCategory/FindCategoryController';

export function makeFindCategoryController(): FindCategoryController {
  const categoryRepository = new TypeormCategoryRepository();
  const findCategory = new FindCategory(categoryRepository);
  const findCategoryController = new FindCategoryController(findCategory);

  return findCategoryController;
}
