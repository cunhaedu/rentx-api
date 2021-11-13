import { IDefaultDTO } from '@infra/dtos/IDefaultDTO';

export interface ISpecificationDTO extends IDefaultDTO {
  name: string;
  description: string;
}
