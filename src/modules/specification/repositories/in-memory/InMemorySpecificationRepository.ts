import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { Specification } from '@modules/specification/infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';

export class InMemorySpecificationRepository
  implements ISpecificationRepository
{
  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  async save({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.specification.push(specification);
    return specification;
  }

  async update(id: string, data: ISpecificationDTO): Promise<void> {
    this.specification = this.specification.map(category => {
      return category.id === id ? { ...data, id } : category;
    });
  }

  async delete(id: string): Promise<void> {
    this.specification = this.specification.filter(
      category => category.id !== id,
    );
  }

  async find(): Promise<Specification[]> {
    return this.specification.map(category => category);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specification.filter(category =>
      ids.includes(<string>category.id),
    );
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.specification.find(category => category.id === id);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specification.find(category => category.name === name);
  }
}
