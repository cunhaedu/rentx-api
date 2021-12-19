import { inject, injectable } from 'tsyringe';

import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

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
