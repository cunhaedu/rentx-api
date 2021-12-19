import { Router } from 'express';

import { CreateUserController } from '@modules/user/useCases/CreateUser/CreateUserController';
import { UpdatedUserAvatarController } from '@modules/user/useCases/UpdateUserAvatar/UpdatedUserAvatarController';
import { ensureAuthenticated, upload } from '@shared/infra/http/middlewares';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdatedUserAvatarController();

const multerUpload = upload({
  fileFormat: ['png', 'svg', 'jpg', 'jpeg'],
  folder: 'avatar',
});

const userRoutes = Router();

userRoutes.post('/', createUserController.handle);
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  multerUpload.single('avatar'),
  updateUserAvatarController.handle,
);

export { userRoutes };
