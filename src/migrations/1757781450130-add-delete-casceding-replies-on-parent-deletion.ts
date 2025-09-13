import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteCascedingRepliesOnParentDeletion1757781450130
  implements MigrationInterface
{
  name = 'AddDeleteCascedingRepliesOnParentDeletion1757781450130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discussion" ADD CONSTRAINT "FK_99a5d60fa07b8bbc078ce85717f" FOREIGN KEY ("parent_id") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "discussion" DROP CONSTRAINT "FK_99a5d60fa07b8bbc078ce85717f"`,
    );
  }
}
