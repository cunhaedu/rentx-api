import { Router } from 'express';

import { CreateCategoryController } from '@modules/car/category/useCases/CreateCategory/CreateCategoryController';
import { FindCategoryController } from '@modules/car/category/useCases/FindCategory/FindCategoryController';
import { ListCategoryController } from '@modules/car/category/useCases/ListCategory/ListCategoryController';
import { ImportCategoryController } from '@modules/car/category/useCases/ImportCategory/ImportCategoryController';
import upload from '@shared/middlewares/upload';

const createCategoryController = new CreateCategoryController();
const findCategoryController = new FindCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

const categoryRoutes = Router();

const multer = upload(2048, ['csv']);

categoryRoutes.post(
  '/import',
  multer.single('file'),
  importCategoryController.handle,
);

categoryRoutes.post('/', createCategoryController.handle);

categoryRoutes.get('/', listCategoryController.handle);

categoryRoutes.get('/:id', findCategoryController.handle);

export { categoryRoutes };