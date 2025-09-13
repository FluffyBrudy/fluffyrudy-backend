import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTypeBooleanToIntegerInIsAdminColumnOfDiscussionEntity1757780614912 implements MigrationInterface {
    name = 'AlterTypeBooleanToIntegerInIsAdminColumnOfDiscussionEntity1757780614912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "discussion" ADD "parent_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "discussion" ADD "parent_id" boolean`);
    }

}
