import { ICarDTO } from '@modules/car/dtos/ICarDTO';

export interface ICarRepository {
  save(data: ICarDTO): Promise<ICarDTO>;
  findByLicensePlate(licensePlate: string): Promise<ICarDTO | undefined>;
}
