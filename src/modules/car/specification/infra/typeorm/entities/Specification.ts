import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ISpecificationDTO } from '@modules/car/specification/dtos/ISpecificationDTO';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';

@Entity('specification')
export class Specification extends DefaultEntity implements ISpecificationDTO {
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
