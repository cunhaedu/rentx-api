import { Router } from 'express';

import { ForgotPasswordController } from '@modules/user/useCases/ForgotPassword/ForgotPasswordController';
import { ResetPasswordController } from '@modules/user/useCases/ResetPassword/ForgotPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', forgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
