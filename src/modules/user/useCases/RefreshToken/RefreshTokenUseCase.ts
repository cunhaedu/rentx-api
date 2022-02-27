import { inject, injectable } from 'tsyringe';

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';

interface ITokenPayload {
  sub: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const authConfig = auth();
    const { sub: userId } = <ITokenPayload>(
      await this.tokenManagerProvider.verify(
        token,
        authConfig.REFRESH_TOKEN_SECRET,
      )
    );

    const userToken = await this.userTokenRepository.findByUserAndRefreshToken(
      userId,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.userTokenRepository.delete(<string>userToken.id);

    const refreshToken = await this.tokenManagerProvider.sign(
      {},
      authConfig.REFRESH_TOKEN_SECRET,
      { subject: userId, expiresIn: authConfig.REFRESH_TOKEN_EXPIRES_IN },
    );

    await this.userTokenRepository.save({
      expiresDate: this.dateProvider.add(
        authConfig.REFRESH_TOKEN_EXPIRES_DAYS,
        'days',
      ),
      refreshToken,
      user: <IUserDTO>{ id: userId },
    });

    return refreshToken;
  }
}
