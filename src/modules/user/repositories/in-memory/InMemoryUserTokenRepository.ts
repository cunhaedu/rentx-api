import { IUserTokenDTO } from '@modules/user/dtos/IUserTokenDTO';
import { UserToken } from '@modules/user/infra/typeorm/entities/UserToken';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';

export class InMemoryUserTokenRepository implements IUserTokenRepository {
  private usersToken: UserToken[];

  constructor() {
    this.usersToken = [];
  }

  async save({
    refreshToken,
    user,
    expiresDate,
  }: IUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      refreshToken,
      user,
      expiresDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.usersToken.push(userToken);
    return userToken;
  }

  async find(): Promise<UserToken[]> {
    return this.usersToken;
  }

  async findByUser(user: string): Promise<UserToken[]> {
    return this.usersToken.filter(userToken => userToken.user?.id === user);
  }

  async findByUserAndRefreshToken(
    user: string,
    token: string,
  ): Promise<IUserTokenDTO | undefined> {
    return this.usersToken.find(
      userToken =>
        userToken.user?.id === user && userToken.refreshToken === token,
    );
  }

  async findByToken(token: string): Promise<IUserTokenDTO | undefined> {
    return this.usersToken.find(userToken => userToken.refreshToken === token);
  }

  async findById(id: string): Promise<UserToken | undefined> {
    return this.usersToken.find(userToken => userToken.id === id);
  }

  async update(id: string, data: UserToken): Promise<void> {
    this.usersToken = this.usersToken.map(userToken => {
      return userToken.id === id ? { ...data, id } : userToken;
    });
  }

  async softDelete(id: string): Promise<void> {
    this.usersToken = this.usersToken.map(userToken => ({
      ...userToken,
      deletedAt: userToken.id === id ? new Date() : userToken.deletedAt,
    }));
  }

  async delete(id: string): Promise<void> {
    this.usersToken = this.usersToken.filter(userToken => userToken.id !== id);
  }
}
