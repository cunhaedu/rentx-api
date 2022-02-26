import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,
  ) {}

  async execute(data: IUserDTO): Promise<IUserDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('Email already exists', 422);
    }

    const passwordHash = await this.encoderProvider.encode(data.password);

    return this.userRepository.save({
      ...data,
      password: passwordHash,
    });
  }
}
