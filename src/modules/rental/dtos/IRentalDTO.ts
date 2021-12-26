import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';

export interface IRentalDTO extends IDefaultDTO {
  startDate: Date;
  endDate: Date | null;
  expectedReturnDate: Date;
  total: number;
  car: ICarDTO;
  user: IUserDTO;
}
