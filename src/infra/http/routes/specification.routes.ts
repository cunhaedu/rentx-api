import { Router } from 'express';
import { makeCreateSpecificationController } from '../factories/controllers/specification/CreateSpecificationController';
import { makeFindSpecificationController } from '../factories/controllers/specification/FindSpecificationController';
import { makeListSpecificationController } from '../factories/controllers/specification/ListSpecificationController';

const specificationRoutes = Router();

specificationRoutes.post('/', (req, res, next) => {
  return makeCreateSpecificationController().handle(req, res, next);
});

specificationRoutes.get('/', (req, res, next) => {
  return makeListSpecificationController().handle(req, res, next);
});

specificationRoutes.get('/:id', (req, res, next) => {
  return makeFindSpecificationController().handle(req, res, next);
});

export { specificationRoutes };
