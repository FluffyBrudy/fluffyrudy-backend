import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAddIsParentAddCorrectType1757566246689
  implements MigrationInterface
{
  name = 'UpdateAddIsParentAddCorrectType1757566246689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD "is_parent" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "post_id"`);
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD "post_id" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "post_id"`);
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD "post_id" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "is_parent"`);
  }
}
