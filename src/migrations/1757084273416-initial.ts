import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1757084273416 implements MigrationInterface {
  name = 'Initial1757084273416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL,
        "email" VARCHAR(50) NOT NULL UNIQUE,
        "password" VARCHAR(64) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
