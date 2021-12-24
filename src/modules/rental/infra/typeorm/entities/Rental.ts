import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { IRentalDTO } from '@modules/rental/dtos/IRentalDTO';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { User } from '@modules/user/infra/typeorm/entities/User';

@Entity('rentals')
export class Rental extends DefaultEntity implements IRentalDTO {
  @PrimaryColumn()
  id?: string;

  @Column()
  endDate: Date;

  @Column()
  expectedReturnDate: Date;

  @Column()
  startDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
