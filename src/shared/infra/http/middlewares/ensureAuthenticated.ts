import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import { UserTokenRepository } from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authConfig = auth();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformed' });
  }

  try {
    const tokenManagerProvider = container.resolve<ITokenManagerProvider>(
      'TokenManagerProvider',
    );

    const { sub } = (await tokenManagerProvider.verify(
      token,
      authConfig.REFRESH_TOKEN_SECRET,
    )) as IPayload;

    const userTokenRepository = new UserTokenRepository();

    const user = await userTokenRepository.findByUserAndRefreshToken(
      sub,
      token,
    );

    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    req.token = {
      sub: {
        user: { id: sub },
      },
    };

    return next();
  } catch (error) {
    return res.status(401).send({ error: 'Token invalid' });
  }
};
