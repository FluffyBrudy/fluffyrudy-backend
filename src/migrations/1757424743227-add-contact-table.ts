import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContactTable1757424743227 implements MigrationInterface {
    name = 'AddContactTable1757424743227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(50) NOT NULL, "subject" character varying(255) NOT NULL, "message" character varying(1000) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
