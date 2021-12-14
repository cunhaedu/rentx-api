import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarController } from '@modules/car/useCases/CreateCar/CreateCarController';

const createCarController = new CreateCarController();

const carRoutes = Router();

carRoutes.use(ensureAuthenticated);
carRoutes.post('/', createCarController.handle);

export { carRoutes };
