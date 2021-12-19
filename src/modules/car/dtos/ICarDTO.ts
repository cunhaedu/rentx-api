import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { ICarImageDTO } from '@modules/car/dtos/ICarImageDTO';

export interface ICarDTO extends IDefaultDTO {
  name: string;
  description: string;
  dailyRate: number;
  available?: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  category?: ICategoryDTO;
  specifications?: ISpecificationDTO[];
  images?: ICarImageDTO[];
}
