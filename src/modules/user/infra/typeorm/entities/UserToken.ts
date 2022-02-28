import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { IUserTokenDTO } from '@modules/user/dtos/IUserTokenDTO';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';

@Entity('user_token')
export class UserToken extends DefaultEntity implements IUserTokenDTO {
  @PrimaryColumn({ name: 'id' })
  id?: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column({ name: 'expires_date' })
  expiresDate: Date;

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
