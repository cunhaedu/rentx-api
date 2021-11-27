import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { TypeormUserRepository } from '@modules/account/user/repositories/implementations/typeorm/TypeormUserRepository';

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

    const userRepository = new TypeormUserRepository();

    const user = userRepository.findById(sub);

    if (!user) {
      return res.status(422).json({ error: 'User does not exists' });
    }

    return next();
  } catch (error) {
    return res.status(401).send({ error: 'Token invalid' });
  }
};
