import { IUserTokenDTO } from '@modules/user/dtos/IUserTokenDTO';

export interface IUserTokenRepository {
  save(data: IUserTokenDTO): Promise<IUserTokenDTO>;
  find(): Promise<IUserTokenDTO[]>;
  findById(id: string): Promise<IUserTokenDTO | undefined>;
  findByUser(email: string): Promise<IUserTokenDTO[]>;
  update(id: string, data: IUserTokenDTO): Promise<void>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
