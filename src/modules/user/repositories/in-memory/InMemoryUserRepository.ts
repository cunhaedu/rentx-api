import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { User } from '@modules/user/infra/typeorm/entities/User';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async save({ name, email, password, driverLicense }: User): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driverLicense,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);
    return user;
  }

  async find(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<IUserDTO | undefined> {
    return this.users.find(user => user.id === id);
  }

  async update(id: string, data: User): Promise<void> {
    this.users = this.users.map(user => {
      return user.id === id ? { ...data, id } : user;
    });
  }

  async softDelete(id: string): Promise<void> {
    this.users = this.users.map(user => ({
      ...user,
      deletedAt: user.id === id ? new Date() : user.deletedAt,
    }));
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}
