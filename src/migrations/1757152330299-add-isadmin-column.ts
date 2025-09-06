import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsadminColumn1757152330299 implements MigrationInterface {
  name = 'AddIsadminColumn1757152330299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin"`);
  }
}
