import { IUserRepository } from '@modules/account/user/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '@modules/account/user/entities/User';

export class TypeormUserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save({
    name,
    username,
    email,
    password,
    driverLicense,
  }: User): Promise<User> {
    const user = await this.repository.create({
      name,
      username,
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
