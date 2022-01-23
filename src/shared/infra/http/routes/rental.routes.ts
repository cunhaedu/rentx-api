import { Router } from 'express';

import { CreateRentalController } from '@modules/rental/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rental/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '@modules/rental/useCases/ListRentalByUser/ListRentalByUserController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

const rentalRoutes = Router();

rentalRoutes.get(
  '/users',
  ensureAuthenticated,
  listRentalByUserController.handle,
);
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:rentalId',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalRoutes };
