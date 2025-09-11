import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnParentIdDefaultValue1757566807040 implements MigrationInterface {
    name = 'AlterColumnParentIdDefaultValue1757566807040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" ALTER COLUMN "parent_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discussion" ALTER COLUMN "parent_id" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" ALTER COLUMN "parent_id" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "discussion" ALTER COLUMN "parent_id" SET NOT NULL`);
    }

}
