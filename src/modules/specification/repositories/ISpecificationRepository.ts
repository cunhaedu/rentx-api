import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';

export interface ISpecificationRepository {
  save(data: ISpecificationDTO): Promise<ISpecificationDTO>;
  update(id: string, data: ISpecificationDTO): Promise<void>;
  delete(id: string): Promise<void>;
  find(): Promise<ISpecificationDTO[]>;
  findByIds(ids: string[]): Promise<ISpecificationDTO[]>;
  findById(id: string): Promise<ISpecificationDTO | undefined>;
  findByName(name: string): Promise<ISpecificationDTO | undefined>;
}
