import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import { IUserDTO } from '@modules/account/user/dtos/IUserDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: IUserDTO): Promise<IUserDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('Email already exists', 422);
    }

    const passwordHash = await hash(data.password, 8);

    return this.userRepository.save({
      ...data,
      password: passwordHash,
    });
  }
}
