import AppError from '@infra/errors/AppError';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

export class CreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

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
