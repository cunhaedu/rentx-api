import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { Category } from '@modules/category/entities/Category';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: ICategoryDTO[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: InMemoryCategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): InMemoryCategoryRepository {
    if (!InMemoryCategoryRepository.INSTANCE) {
      InMemoryCategoryRepository.INSTANCE = new InMemoryCategoryRepository();
    }

    return InMemoryCategoryRepository.INSTANCE;
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
    this.categories.map(category => {
      if (category.id === id) {
        // eslint-disable-next-line no-param-reassign
        category = { ...data, id };
      }

      return category;
    });
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(category => category.id !== id);
  }

  async find(): Promise<Category[]> {
    return this.categories.map(category => category);
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }
}
