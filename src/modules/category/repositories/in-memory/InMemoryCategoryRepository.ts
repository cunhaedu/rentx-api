import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { Category } from '@modules/category/infra/typeorm/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async save({ name, description }: ICategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.categories.push(category);
    return category;
  }

  async update(id: string, data: ICategoryDTO): Promise<void> {
    this.categories = this.categories.map(category => {
      return category.id === id ? { ...data, id } : category;
    });
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(category => category.id !== id);
  }

  async find(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }
}
