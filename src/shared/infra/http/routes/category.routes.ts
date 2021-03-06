import { Router } from 'express';

import { CreateCategoryController } from '@modules/category/useCases/CreateCategory/CreateCategoryController';
import { FindCategoryController } from '@modules/category/useCases/FindCategory/FindCategoryController';
import { ListCategoryController } from '@modules/category/useCases/ListCategory/ListCategoryController';
import { ImportCategoryController } from '@modules/category/useCases/ImportCategory/ImportCategoryController';
import {
  ensureAdmin,
  ensureAuthenticated,
  upload,
} from '@shared/infra/http/middlewares';

const createCategoryController = new CreateCategoryController();
const findCategoryController = new FindCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

const categoryRoutes = Router();

const multerUpload = upload({
  fileFormat: ['csv'],
  folder: 'files',
});

categoryRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  multerUpload.single('file'),
  importCategoryController.handle,
);

categoryRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoryRoutes.get('/', listCategoryController.handle);

categoryRoutes.get('/:id', findCategoryController.handle);

export { categoryRoutes };
