import fs from 'fs';
import csvParse from 'csv-parse';

import { ICategoryRepository } from '@modules/car/category/repositories/ICategoryRepository';
import { ICategoryDTO } from '@modules/car/category/dtos/ICategoryDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoryRepository.findByName(
        name,
      );

      if (!categoryAlreadyExists) {
        await this.categoryRepository.save({
          name,
          description,
        } as ICategoryDTO);
      }
    });
  }

  async loadCategories(file: Express.Multer.File): Promise<ICategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ICategoryDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({ name, description } as ICategoryDTO);
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', error => {
          reject(error);
        });
    });
  }
}
