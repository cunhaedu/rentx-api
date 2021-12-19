import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTableCarsSpecifications1639854234005
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_specifications',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'specification_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'cars_specifications_car_fk',
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'cars_specifications_specification_fk',
            columnNames: ['specification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specifications',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_specifications');
  }
}
