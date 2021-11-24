import { getRepository, Repository } from 'typeorm';

import { ISpecificationDTO } from '@modules/car/specification/dtos/ISpecificationDTO';
import { Specification } from '@modules/car/specification/entities/Specification';
import { ISpecificationRepository } from '@modules/car/specification/repositories/ISpecificationRepository';

export class TypeormSpecificationRepository
  implements ISpecificationRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async save({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      name,
      description,
    });

    return this.repository.save(specification);
  }

  async update(id: string, data: ISpecificationDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async find(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.repository.findOne(id);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }
}
