import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UserRepository } from '@modules/account/user/infra/typeorm/repositories/UserRepository';

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
    const { sub } = verify(token, authConfig.SECRET) as IPayload;

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
