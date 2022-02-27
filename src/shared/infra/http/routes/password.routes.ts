import { Router } from 'express';

import { ForgotPasswordController } from '@modules/user/useCases/ForgotPassword/ForgotPasswordController';

const forgotPasswordController = new ForgotPasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', forgotPasswordController.handle);

export { passwordRoutes };
