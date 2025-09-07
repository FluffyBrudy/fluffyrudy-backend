import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscussionModel1757246528271 implements MigrationInterface {
  name = 'AddDiscussionModel1757246528271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "markdown"."discussion" ("id" SERIAL NOT NULL, "content" text NOT NULL, "post_slug" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "PK_b93169eb129e530c6a4c3b9fda1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "markdown"."discussion" ADD CONSTRAINT "FK_1fe33b0b6f03c0db691dabff515" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "markdown"."discussion" DROP CONSTRAINT "FK_1fe33b0b6f03c0db691dabff515"`,
    );
    await queryRunner.query(`DROP TABLE "markdown"."discussion"`);
  }
}
