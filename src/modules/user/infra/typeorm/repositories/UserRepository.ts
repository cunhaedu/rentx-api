import { getRepository, Repository } from 'typeorm';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@modules/user/infra/typeorm/entities/User';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save({ name, email, password, driverLicense }: User): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
    });

    return this.repository.save(user);
  }

  async find(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async update(id: string, data: User): Promise<void> {
    await this.repository.update(id, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
