import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindCategory {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(id: string): Promise<ICategoryDTO> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Entity not found', 422);
    }

    return category;
  }
}
