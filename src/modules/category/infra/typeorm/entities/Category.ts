import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ICategoryDTO } from '@modules/category/dtos/ICategoryDTO';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';

@Entity('category')
export class Category extends DefaultEntity implements ICategoryDTO {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
