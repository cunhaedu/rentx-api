import upload from '@infra/middlewares/upload';
import { Router } from 'express';
import { makeCreateCategoryController } from '../factories/controllers/category/CreateCategoryController';
import { makeFindCategoryController } from '../factories/controllers/category/FindCategoryController';
import { makeImportCategoryController } from '../factories/controllers/category/ImportCategoryController';
import { makeListCategoryController } from '../factories/controllers/category/ListCategoryController';

const categoryRoutes = Router();

const multer = upload(2048, ['csv']);

categoryRoutes.post('/import', multer.single('file'), (req, res, next) => {
  return makeImportCategoryController().handle(req, res, next);
});

categoryRoutes.post('/', (req, res, next) => {
  return makeCreateCategoryController().handle(req, res, next);
});

categoryRoutes.get('/', (req, res, next) => {
  return makeListCategoryController().handle(req, res, next);
});

categoryRoutes.get('/:id', (req, res, next) => {
  return makeFindCategoryController().handle(req, res, next);
});

export { categoryRoutes };
