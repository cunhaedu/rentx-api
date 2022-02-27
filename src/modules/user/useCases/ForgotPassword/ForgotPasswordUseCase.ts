import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

import AppError from '@shared/errors/AppError';
import { IEmailProvider } from '@shared/providers/EmailProvider/IEmailProvider';

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuidV4();

    await this.userTokenRepository.save({
      refreshToken: token,
      expiresDate: this.dateProvider.add(1, 'hours'),
      user,
    });

    await this.emailProvider.sendMail({
      to: [{ name: user.name, email: user.email }],
      subject: 'Recuperação de senha',
      body: `O link para o reset é: <b>${token}</b>`,
    });

    return token;
  }
}
