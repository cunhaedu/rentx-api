import { ICategoryDTO } from '@modules/car/category/dtos/ICategoryDTO';

export interface ICategoryRepository {
  save(data: ICategoryDTO): Promise<ICategoryDTO>;
  update(id: string, data: ICategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  find(): Promise<ICategoryDTO[]>;
  findById(id: string): Promise<ICategoryDTO | undefined>;
  findByName(name: string): Promise<ICategoryDTO | undefined>;
}
