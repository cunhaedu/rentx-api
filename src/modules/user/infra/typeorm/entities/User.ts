import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';

@Entity('users')
export class User extends DefaultEntity implements IUserDTO {
  @PrimaryColumn({ name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_admin' })
  isAdmin?: boolean;

  @Column()
  avatar?: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
