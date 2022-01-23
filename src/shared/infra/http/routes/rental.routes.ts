import { Router } from 'express';

import { CreateRentalController } from '@modules/rental/useCases/CreateRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';
import { DevolutionRentalController } from '@modules/rental/useCases/DevolutionRental/DevolutionRentalController';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:rentalId',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalRoutes };
