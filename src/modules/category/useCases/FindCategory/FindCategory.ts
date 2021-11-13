import AppError from '@infra/errors/AppError';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

export class FindCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<ICategoryDTO> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Entity not found', 422);
    }

    return category;
  }
}
