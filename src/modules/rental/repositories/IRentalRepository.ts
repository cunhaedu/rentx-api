import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';

export interface IRentalRepository {
  save(data: IRentalDTO): Promise<IRentalDTO>;
  listByUser(user: string): Promise<IRentalDTO[]>;
  findById(id: string): Promise<IRentalDTO | undefined>;
  findOpenRenalByUser(id: string): Promise<IRentalDTO | undefined>;
  findOpenRentalByCar(id: string): Promise<IRentalDTO | undefined>;
}
