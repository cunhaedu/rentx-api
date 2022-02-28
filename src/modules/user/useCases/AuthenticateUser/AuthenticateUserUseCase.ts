import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import AppError from '@shared/errors/AppError';
import auth from '@config/auth';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: IUserDTO;
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect', 422);
    }

    const passwordMatch = await this.encoderProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 422);
    }

    const authConfig = auth();

    const token = await this.tokenManagerProvider.sign({}, authConfig.SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    const refreshToken = await this.tokenManagerProvider.sign(
      {},
      authConfig.REFRESH_TOKEN_SECRET,
      { subject: user.id, expiresIn: authConfig.REFRESH_TOKEN_EXPIRES_IN },
    );

    await this.userTokenRepository.save({
      expiresDate: this.dateProvider.add(
        authConfig.REFRESH_TOKEN_EXPIRES_DAYS,
        'days',
      ),
      refreshToken,
      user,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      } as IUserDTO,
      token,
      refreshToken,
    };
  }
}
