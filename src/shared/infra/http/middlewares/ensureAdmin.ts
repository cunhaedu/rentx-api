import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.token.sub.user;
  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user || !user.isAdmin) {
    return res.status(401).json({ error: 'User is not an admin' });
  }

  return next();
};
