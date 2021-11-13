import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

export class ListCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<ICategoryDTO[]> {
    return this.categoryRepository.find();
  }
}
