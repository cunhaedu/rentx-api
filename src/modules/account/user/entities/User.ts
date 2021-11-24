import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { IUserDTO } from '@modules/account/user/dtos/IUserDTO';

@Entity('user')
export class User extends DefaultEntity implements IUserDTO {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'admin' })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
