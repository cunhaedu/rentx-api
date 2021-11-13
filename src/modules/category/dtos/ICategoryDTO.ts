import { IDefaultDTO } from '@infra/dtos/IDefaultDTO';

export interface ICategoryDTO extends IDefaultDTO {
  name: string;
  description: string;
}
