import { v4 as uuidv4 } from 'uuid';

import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';

export class Specification implements ISpecificationDTO {
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
