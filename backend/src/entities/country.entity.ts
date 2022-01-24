// import {
//   Column,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Customer } from '../customer/entity/customer.entity';
// import { Invoice } from '../order/entities/invoice.entity';

// @Entity('country', { schema: 'school_project_nodejs_db' })
// export class Country {
//   @PrimaryGeneratedColumn({ type: 'int', name: 'CountryId' })
//   countryId: number;

//   @Column('varchar', { name: 'CountryName', length: 100 })
//   countryName: string;

//   @Column('char', { name: 'ISO3166_Alpha2', length: 2 })
//   iso3166Alpha2: string;

//   @Column('int', { name: 'DisplayOrder' })
//   displayOrder: number;

//   @UpdateDateColumn({ name: 'ModifiedDate' })
//   modifiedDate: Date;

//   @Column('tinyint', { name: 'Active', width: 1 })
//   active: boolean;

//   @OneToMany(() => Customer, (customer) => customer.country)
//   customers: Customer[];

//   @OneToMany(() => Invoice, (invoice) => invoice.country)
//   invoices: Invoice[];
// }
