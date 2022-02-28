import { getRepository, Repository } from 'typeorm';

import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { UserToken } from '@modules/user/infra/typeorm/entities/UserToken';

export class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async save({
    user,
    expiresDate,
    refreshToken,
  }: UserToken): Promise<UserToken> {
    const userToken = this.repository.create({
      user,
      expiresDate,
      refreshToken,
    });

    return this.repository.save(userToken);
  }

  async find(): Promise<UserToken[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<UserToken | undefined> {
    return this.repository.findOne(id);
  }

  async findByUser(user: string): Promise<UserToken[]> {
    return this.repository.find({ user: { id: user } });
  }

  async findByUserAndRefreshToken(
    user: string,
    refreshToken: string,
  ): Promise<UserToken | undefined> {
    return this.repository.findOne({ user: { id: user }, refreshToken });
  }

  findByToken(token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({
      relations: ['user'],
      where: { refreshToken: token },
    });
  }

  async update(id: string, data: UserToken): Promise<void> {
    await this.repository.update(id, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
