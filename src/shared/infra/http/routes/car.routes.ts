import { Router } from 'express';

import { CreateCarController } from '@modules/car/useCases/CreateCar/CreateCarController';
import {
  ensureAdmin,
  ensureAuthenticated,
} from '@shared/infra/http/middlewares';

const createCarController = new CreateCarController();

const carRoutes = Router();

carRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

export { carRoutes };
