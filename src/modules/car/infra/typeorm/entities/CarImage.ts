import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { ICarImageDTO } from '@modules/car/dtos/ICarImageDTO';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

@Entity('cars_images')
export class CarImage extends DefaultEntity implements ICarImageDTO {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'image' })
  name: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
