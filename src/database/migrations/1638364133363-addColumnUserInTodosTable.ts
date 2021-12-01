import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class addColumnUserInTodosTable1638364133363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "todos",
      new TableColumn({
        name: "user_id",
        type: "integer",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "todos",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("todos");

    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1
    );

    await queryRunner.dropForeignKey("todos", foreignKey!);
    await queryRunner.dropColumn("todos", "user_id");
  }
}
