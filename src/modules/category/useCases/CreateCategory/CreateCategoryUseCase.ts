import { inject, injectable } from 'tsyringe';

import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: ICategoryDTO): Promise<ICategoryDTO> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 422);
    }

    return this.categoryRepository.save(data);
  }
}
