import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
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
      authConfig.SECRET,
    )) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(sub);

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
