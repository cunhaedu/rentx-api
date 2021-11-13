import { Router } from 'express';
import { makeCreateCategoryController } from '../factories/controllers/category/CreateCategoryController';
import { makeFindCategoryController } from '../factories/controllers/category/FindCategoryController';
import { makeListCategoryController } from '../factories/controllers/category/ListCategoryController';

const categoryRoutes = Router();

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
