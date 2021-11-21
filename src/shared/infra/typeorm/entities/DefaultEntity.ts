import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { IDefaultEntityDTO } from '@shared/dtos/IDefaultEntityDTO';

export class DefaultEntity implements IDefaultEntityDTO {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
