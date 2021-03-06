import { Router } from 'express';

import { CreateSpecificationController } from '@modules/specification/useCases/CreateSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/specification/useCases/ListSpecification/ListSpecificationController';
import { FindSpecificationController } from '@modules/specification/useCases/FindSpecification/FindSpecificationController';
import {
  ensureAdmin,
  ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();
const findSpecificationController = new FindSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);
specificationRoutes.get('/', listSpecificationController.handle);
specificationRoutes.get('/:id', findSpecificationController.handle);

export { specificationRoutes };
