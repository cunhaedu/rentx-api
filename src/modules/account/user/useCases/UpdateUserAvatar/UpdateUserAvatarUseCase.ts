import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { deleteFile } from '@shared/helpers/file';

interface IUpdateUserAvatarRequest {
  id: string;
  avatar: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, avatar }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Email already exists', 422);
    }

    if (user.avatar) {
      await deleteFile('avatar', user.avatar);
    }

    await this.userRepository.update(id, {
      ...user,
      avatar,
    });
  }
}
