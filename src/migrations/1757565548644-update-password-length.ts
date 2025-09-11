import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePasswordLength1757565548644 implements MigrationInterface {
  name = 'UpdatePasswordLength1757565548644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(128) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(64) NOT NULL`,
    );
  }
}
