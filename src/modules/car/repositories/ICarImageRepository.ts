import { ICarImageDTO } from '@modules/car/dtos/ICarImageDTO';

export interface ICarImageRepository {
  save(data: ICarImageDTO): Promise<ICarImageDTO>;
}
