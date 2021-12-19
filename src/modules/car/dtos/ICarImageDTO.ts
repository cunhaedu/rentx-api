import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';

export interface ICarImageDTO extends IDefaultDTO {
  name: string;
  car: ICarDTO;
}
