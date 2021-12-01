import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableRefreshToken1638385799259
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_token",
        columns: [
          {
            name: "id",
            type: "integer",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "refresh_token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "expiresin",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "refresh_token",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("refresh_token");

    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1
    );

    await queryRunner.dropForeignKey("refresh_token", foreignKey!);
    await queryRunner.dropTable("refresh_token");
  }
}
