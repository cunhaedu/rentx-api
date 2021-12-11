import { Router } from 'express';

import { CreateSpecificationController } from '@modules/car/specification/useCases/CreateSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/car/specification/useCases/ListSpecification/ListSpecificationController';
import { FindSpecificationController } from '@modules/car/specification/useCases/FindSpecification/FindSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();
const findSpecificationController = new FindSpecificationController();

const specificationRoutes = Router();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationController.handle);
specificationRoutes.get('/', listSpecificationController.handle);
specificationRoutes.get('/:id', findSpecificationController.handle);

export { specificationRoutes };
