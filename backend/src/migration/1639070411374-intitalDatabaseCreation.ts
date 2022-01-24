import { MigrationInterface, QueryRunner } from 'typeorm';

export class intitalDatabaseCreation1639070411374
  implements MigrationInterface
{
  name = 'intitalDatabaseCreation1639070411374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE productcategory (id varchar(36) NOT NULL, isActive tinyint NOT NULL DEFAULT 1, isArchived tinyint NOT NULL DEFAULT 0, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, productCategoryName varchar(100) NOT NULL, PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `CREATE TABLE product (id varchar(36) NOT NULL, isActive tinyint NOT NULL DEFAULT 1, isArchived tinyint NOT NULL DEFAULT 0, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, partNumber varchar(50) NOT NULL, name varchar(100) NOT NULL, price decimal(10,2) NOT NULL, description text NULL, productCategoryId varchar(255) NOT NULL, imageFile varchar(250) NULL, PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `CREATE TABLE invoiceline (id varchar(36) NOT NULL, isActive tinyint NOT NULL DEFAULT 1, isArchived tinyint NOT NULL DEFAULT 0, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, invoiceId varchar(255) NOT NULL, productId varchar(255) NOT NULL, lineText text NOT NULL, price decimal(10,2) NOT NULL, quantity int NOT NULL, PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `CREATE TABLE currency (
          id varchar(36) NOT NULL, 
          isActive tinyint NOT NULL DEFAULT 1, 
          isArchived tinyint NOT NULL DEFAULT 0, 
          createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
          updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
          deletedAt datetime(6) NULL, 
          currencyName varchar(100) NOT NULL, 
          iso4217Iso char(3) NOT NULL, UNIQUE INDEX IDX_1ac8cdc33dbe724b4cdfdd619b (iso4217Iso), 
          PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `CREATE TABLE invoice (id varchar(36) NOT NULL, isActive tinyint NOT NULL DEFAULT 1, isArchived tinyint NOT NULL DEFAULT 0, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, customerId varchar(255) NOT NULL, invoiceNumber int NOT NULL, paid tinyint(1) NOT NULL, paidDate datetime NULL, dueDate datetime NOT NULL, comment text NULL, currencyId varchar(255) NOT NULL, name varchar(100) NOT NULL, address varchar(100) NOT NULL, zipcode varchar(100) NOT NULL, city varchar(100) NOT NULL, country varchar(255) NOT NULL, PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `CREATE TABLE customer (id varchar(36) NOT NULL, isActive tinyint NOT NULL DEFAULT 1, isArchived tinyint NOT NULL DEFAULT 0, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), deletedAt datetime(6) NULL, firstName varchar(100) NOT NULL, lastName varchar(100) NOT NULL, address varchar(100) NULL, zipcode varchar(100) NULL, city varchar(100) NULL, country varchar(255) NULL, phone varchar(50) NULL, email varchar(100) NOT NULL, bio text NULL, password varchar(255) NULL, UNIQUE INDEX IDX_fdb2f3ad8115da4c7718109a6e (email), PRIMARY KEY (id))`,
    );
    await queryRunner.query(
      `ALTER TABLE product ADD CONSTRAINT FK_618194d24a7ea86a165d7ec628e FOREIGN KEY (productCategoryId) REFERENCES productcategory(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE invoiceline ADD CONSTRAINT FK_b75db7b08588ef12058acccf29f FOREIGN KEY (invoiceId) REFERENCES invoice(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE invoiceline ADD CONSTRAINT FK_2c4c352b8437f44f915f8d08468 FOREIGN KEY (productId) REFERENCES product(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE invoice ADD CONSTRAINT FK_45184bf71860b1e17cb683b746c FOREIGN KEY (currencyId) REFERENCES currency(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE invoice ADD CONSTRAINT FK_925aa26ea12c28a6adb614445ee FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE invoice DROP FOREIGN KEY FK_925aa26ea12c28a6adb614445ee`,
    );
    await queryRunner.query(
      `ALTER TABLE invoice DROP FOREIGN KEY FK_45184bf71860b1e17cb683b746c`,
    );
    await queryRunner.query(
      `ALTER TABLE invoiceline DROP FOREIGN KEY FK_2c4c352b8437f44f915f8d08468`,
    );
    await queryRunner.query(
      `ALTER TABLE invoiceline DROP FOREIGN KEY FK_b75db7b08588ef12058acccf29f`,
    );
    await queryRunner.query(
      `ALTER TABLE product DROP FOREIGN KEY FK_618194d24a7ea86a165d7ec628e`,
    );
    await queryRunner.query(
      `DROP INDEX IDX_fdb2f3ad8115da4c7718109a6e ON customer`,
    );
    await queryRunner.query(`DROP TABLE customer`);
    await queryRunner.query(`DROP TABLE invoice`);
    await queryRunner.query(
      `DROP INDEX IDX_1ac8cdc33dbe724b4cdfdd619b ON currency`,
    );
    await queryRunner.query(`DROP TABLE currency`);
    await queryRunner.query(`DROP TABLE invoiceline`);
    await queryRunner.query(`DROP TABLE product`);
    await queryRunner.query(`DROP TABLE productcategory`);
  }
}
