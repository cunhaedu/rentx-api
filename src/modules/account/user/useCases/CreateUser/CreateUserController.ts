import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/account/user/useCases/CreateUser/CreateUserUseCase';
import { IUserDTO } from '@modules/account/user/dtos/IUserDTO';

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, driverLicense } = req.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        driverLicense,
      } as IUserDTO);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
