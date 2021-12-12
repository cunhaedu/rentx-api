import { getRepository, Repository } from 'typeorm';

import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { Specification } from '@modules/specification/infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';

export class SpecificationRepository implements ISpecificationRepository {
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
