import {MigrationInterface, QueryRunner} from "typeorm";

export class fixSomeColums1639712889487 implements MigrationInterface {
    name = 'fixSomeColums1639712889487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoiceline\` CHANGE \`lineText\` \`lineText\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoiceline\` CHANGE \`lineText\` \`lineText\` text NOT NULL`);
    }

}
