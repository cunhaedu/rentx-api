import { ICarDTO } from '@modules/car/dtos/ICarDTO';

export interface IFindAvailableCarsOptions {
  category?: string;
  name?: string;
  brand?: string;
}

export interface ICarRepository {
  save(data: ICarDTO): Promise<ICarDTO>;
  findAvailable(options?: IFindAvailableCarsOptions): Promise<ICarDTO[]>;
  findById(id: string): Promise<ICarDTO | undefined>;
  findByLicensePlate(licensePlate: string): Promise<ICarDTO | undefined>;
}
