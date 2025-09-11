import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnAndDtypeFromBoolToId1757566755642 implements MigrationInterface {
    name = 'AlterColumnAndDtypeFromBoolToId1757566755642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" RENAME COLUMN "is_parent" TO "parent_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" RENAME COLUMN "parent_id" TO "is_parent"`);
    }

}
