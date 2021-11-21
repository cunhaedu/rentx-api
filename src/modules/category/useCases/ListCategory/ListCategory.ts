import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCategory {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<ICategoryDTO[]> {
    return this.categoryRepository.find();
  }
}
