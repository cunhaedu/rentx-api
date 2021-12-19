import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { Category } from '@modules/category/infra/typeorm/entities/Category';
import { Specification } from '@modules/specification/infra/typeorm/entities/Specification';

@Entity('cars')
export class Car extends DefaultEntity implements ICarDTO {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  available?: boolean;

  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

  @ManyToMany(() => Specification, { cascade: true })
  @JoinTable({
    name: 'cars_specifications',
    joinColumn: { name: 'car_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specification_id', referencedColumnName: 'id' },
  })
  specifications?: Specification[];

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}
