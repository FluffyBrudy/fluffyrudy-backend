import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscussion1757248495386 implements MigrationInterface {
  name = 'AddDiscussion1757248495386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "discussion" ("id" SERIAL NOT NULL, "content" text NOT NULL, "post_id" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "PK_b93169eb129e530c6a4c3b9fda1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD CONSTRAINT "FK_1fe33b0b6f03c0db691dabff515" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discussion" DROP CONSTRAINT "FK_1fe33b0b6f03c0db691dabff515"`,
    );
    await queryRunner.query(`DROP TABLE "discussion"`);
  }
}
