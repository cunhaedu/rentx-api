import { Router } from 'express';

import { CreateCarController } from '@modules/car/useCases/CreateCar/CreateCarController';
import { ListAvailableCarController } from '@modules/car/useCases/ListAvailableCar/ListAvailableCarController';
import { CreateCarSpecificationController } from '@modules/car/useCases/CreateCarSpecification/CreateCarSpecificationController';
import {
  ensureAdmin,
  ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarController = new ListAvailableCarController();

const carRoutes = Router();

carRoutes.get('/available', listAvailableCarController.handle);

carRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

export { carRoutes };
