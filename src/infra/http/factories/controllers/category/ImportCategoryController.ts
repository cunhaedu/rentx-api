import { InMemoryCategoryRepository } from '@modules/category/repositories/implementations/in-memory/InMemoryCategoryRepository';
import { ImportCategory } from '@modules/category/useCases/ImportCategory/ImportCategory';
import { ImportCategoryController } from '@modules/category/useCases/ImportCategory/ImportCategoryController';

export function makeImportCategoryController() {
  const categoryRepository = InMemoryCategoryRepository.getInstance();
  const importCategory = new ImportCategory(categoryRepository);
  const importCategoryController = new ImportCategoryController(importCategory);

  return importCategoryController;
}
