import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import { IUserDTO } from '@modules/account/user/dtos/IUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: IUserDTO): Promise<IUserDTO> {
    return this.userRepository.save(data);
  }
}
