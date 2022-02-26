import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { IUserDTO } from './IUserDTO';

export interface IUserTokenDTO extends IDefaultDTO {
  refreshToken: string;
  expiresDate: Date;
  user: IUserDTO;
}
