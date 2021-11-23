import { TypeormCategoryRepository } from '@modules/category/repositories/implementations/typeorm/TypeormCategoryRepository';
import { ImportCategory } from '@modules/category/useCases/ImportCategory/ImportCategory';
import { ImportCategoryController } from '@modules/category/useCases/ImportCategory/ImportCategoryController';

export function makeImportCategoryController(): ImportCategoryController {
  const categoryRepository = new TypeormCategoryRepository();
  const importCategory = new ImportCategory(categoryRepository);
  const importCategoryController = new ImportCategoryController(importCategory);

  return importCategoryController;
}
