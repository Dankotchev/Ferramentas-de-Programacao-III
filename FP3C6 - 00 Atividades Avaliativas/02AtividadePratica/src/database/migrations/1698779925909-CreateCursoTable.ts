import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCursoTable1698779925909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curso',
        columns: [
          {
            name: 'codigo',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'periodo',
            type: 'varchar',
          },
          {
            name: 'nivel_codigo',
            type: 'integer',
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: 'nivel_curso_fk',
            columnNames: ['nivel_codigo'],
            referencedTableName: 'nivel',
            referencedColumnNames: ['codigo'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('curso');
  }
}
