import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCurrencyToProducts1639346707914 implements MigrationInterface {
  name = 'addCurrencyToProducts1639346707914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`currencyId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_498f0ae3619a8e1f2f42434a4f7\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_498f0ae3619a8e1f2f42434a4f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`currencyId\``,
    );
  }
}
