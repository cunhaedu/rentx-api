import { Router } from 'express';

import { AuthenticateUserController } from '@modules/account/user/useCases/AuthenticateUser/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();

const authenticateRoutes = Router();

authenticateRoutes.post('/', authenticateUserController.handle);

export { authenticateRoutes };
