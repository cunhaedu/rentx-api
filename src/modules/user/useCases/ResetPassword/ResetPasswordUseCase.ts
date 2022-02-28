import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import AppError from '@shared/errors/AppError';

interface IResetPassword {
  password: string;
  token: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,
  ) {}

  async execute({ password, token }: IResetPassword): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Invalid Token!');
    }

    const hasValidExpiration = this.dateProvider.compareIfBefore(
      userToken.expiresDate,
      this.dateProvider.getCurrentDate(),
    );

    if (!hasValidExpiration) {
      throw new AppError('Expired Token!');
    }

    const passwordHash = await this.encoderProvider.encode(password);

    await this.userRepository.update(<string>userToken.user.id, {
      ...userToken.user,
      password: passwordHash,
    });

    await this.userTokenRepository.delete(<string>userToken.id);
  }
}
