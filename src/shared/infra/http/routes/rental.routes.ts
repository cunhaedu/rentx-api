import { Router } from 'express';

import { CreateRentalController } from '@modules/rental/useCases/CreateRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
