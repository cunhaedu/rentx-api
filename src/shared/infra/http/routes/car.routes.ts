import { Router } from 'express';

import { CreateCarController } from '@modules/car/useCases/CreateCar/CreateCarController';
import { ListAvailableCarController } from '@modules/car/useCases/ListAvailableCar/ListAvailableCarController';
import { CreateCarSpecificationController } from '@modules/car/useCases/CreateCarSpecification/CreateCarSpecificationController';
import {
  ensureAdmin,
  ensureAuthenticated,
  upload,
} from '@shared/infra/http/middlewares';
import { UploadCarImageController } from '@modules/car/useCases/UploadCarImage/UploadCarImageController';

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarController = new ListAvailableCarController();
const uploadCarImageController = new UploadCarImageController();

const multerUpload = upload({
  fileFormat: ['png', 'svg', 'jpg', 'jpeg'],
  folder: 'cars/images',
});

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

carRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  multerUpload.array('images'),
  uploadCarImageController.handle,
);

export { carRoutes };
