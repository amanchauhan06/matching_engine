import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class migrations1661253381025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order', new TableColumn({
            name: "companyId",
            type: "uuid",
        }),);
      await queryRunner.createForeignKey('order', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ["id"],
            referencedTableName: "master_entity",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey("answer", foreignKey)
    }

}
