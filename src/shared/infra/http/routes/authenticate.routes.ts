import { Router } from 'express';

import { AuthenticateUserController } from '@modules/user/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/user/useCases/RefreshToken/RefreshTokenController';

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authenticateRoutes = Router();

authenticateRoutes.post('/', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
