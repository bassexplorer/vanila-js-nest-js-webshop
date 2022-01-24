import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Customer } from '../customer/entity/customer.entity';

export class ExtendedDbSeed1668556800001 implements MigrationInterface {
  name = 'SeedScript1668556800001';

  public async up(): Promise<void> {
    const modifier = {
      createdBy: 'SEEDSCRIPT',
      lastChangedBy: 'SEEDSCRIPT',
    };

    const modder = (obj) =>
      obj.map((currentObj) => ({ ...currentObj, ...modifier }));

    const customers = getRepository(Customer).create(
      modder([
        {
          email: 'webshop@test.me',
          password: 'password123',
          firstName: 'Test',
          lastName: 'Account',
          address: 'Ducky Duck 12 St',
          zipcode: '9000',
          country: 'Denmark',
          city: 'Aalborg',
          phone: '+45 12 34 56 78',
        },
      ]),
    );

    await getRepository(Customer).save(customers);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE role;');
  }
}
