import { getRepository, Repository } from 'typeorm';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { Category } from '@modules/category/entities/Category';

export class TypeormCategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async save({ name, description }: ICategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    })

    return this.repository.save(category);
  }

  async update(id: string, data: ICategoryDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async find(): Promise<Category[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.repository.findOne(id);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}
