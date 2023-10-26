import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1698341636734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "codigo",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "preco",
            type: "decimal",
            scale: 2,
            precision: 10,
          },
          {
            name: "estoque",
            type: "integer",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
