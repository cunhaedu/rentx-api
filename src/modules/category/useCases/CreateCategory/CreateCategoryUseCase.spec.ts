import { InMemoryCategoryRepository } from '@modules/category/repositories/in-memory/InMemoryCategoryRepository';
import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { CreateCategoryUseCase } from '@modules/category/useCases/CreateCategory/CreateCategoryUseCase';
import AppError from '@shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe('create category use case test suit', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository,
    );
  });

  it('should be able to create a new category', async () => {
    const categoryData: ICategoryDTO = {
      name: 'Category name test',
      description: 'Category description test',
    };

    const category = await createCategoryUseCase.execute(categoryData);

    expect(category).toHaveProperty('id');

    expect(category).toEqual(
      expect.objectContaining({
        name: categoryData.name,
        description: categoryData.description,
      }),
    );
  });

  it('should not be able to create a new category with repeat name', async () => {
    await expect(async () => {
      const category: ICategoryDTO = {
        name: 'Category name test',
        description: 'Category description test',
      };

      await createCategoryUseCase.execute(category);

      const category2: ICategoryDTO = {
        name: 'Category name test',
        description: 'Category description test',
      };

      await createCategoryUseCase.execute(category2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
