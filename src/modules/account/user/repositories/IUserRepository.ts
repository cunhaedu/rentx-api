import { IUserDTO } from '@modules/account/user/dtos/IUserDTO';

export interface IUserRepository {
  save(data: IUserDTO): Promise<IUserDTO>;
  find(): Promise<IUserDTO[]>;
  findById(id: string): Promise<IUserDTO | undefined>;
  update(id: string, data: IUserDTO): Promise<void>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
