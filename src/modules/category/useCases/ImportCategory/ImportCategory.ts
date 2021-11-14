import fs from 'fs';
import csvParse from 'csv-parse';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoryRepository.findByName(
        name,
      );

      if (!categoryAlreadyExists) {
        await this.categoryRepository.save({ name, description });
      }
    });
  }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({ name, description });
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
