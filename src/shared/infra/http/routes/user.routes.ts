import { Router } from 'express';

import { CreateUserController } from '@modules/account/user/useCases/CreateUser/CreateUserController';
import { UpdatedUserAvatarController } from '@modules/account/user/useCases/UpdateUserAvatar/UpdatedUserAvatarController';
import upload from '@shared/infra/http/middlewares/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

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
