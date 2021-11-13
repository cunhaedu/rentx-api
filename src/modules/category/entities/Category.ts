import { v4 as uuidv4 } from 'uuid';

import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';

export class Category implements ICategoryDTO {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  id?: string;

  name: string;

  description: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}
