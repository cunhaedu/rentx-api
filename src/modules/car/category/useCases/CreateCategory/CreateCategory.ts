import { inject, injectable } from 'tsyringe';

import { ICategoryDTO } from '@modules/car/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/car/category/repositories/ICategoryRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateCategory {
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
