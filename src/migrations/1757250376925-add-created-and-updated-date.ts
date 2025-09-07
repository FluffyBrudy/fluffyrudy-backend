import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAndUpdatedDate1757250376925
  implements MigrationInterface
{
  name = 'AddCreatedAndUpdatedDate1757250376925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()`,
    );
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "discussion" DROP COLUMN "created_at"`,
    );
  }
}
