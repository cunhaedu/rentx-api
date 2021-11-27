import { inject, injectable } from 'tsyringe';

import { ICategoryDTO } from '@modules/car/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/car/category/repositories/ICategoryRepository';

@injectable()
export class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<ICategoryDTO[]> {
    return this.categoryRepository.find();
  }
}
