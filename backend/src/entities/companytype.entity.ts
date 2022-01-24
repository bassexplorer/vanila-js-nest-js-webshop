// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Customer } from '../customer/entity/customer.entity';

// @Entity('companytype', { schema: 'school_project_nodejs_db' })
// export class Companytype {
//   @PrimaryGeneratedColumn({ type: 'int', name: 'CompanyTypeId' })
//   companyTypeId: number;

//   @Column('varchar', { name: 'CompanyTypeName', length: 100 })
//   companyTypeName: string;

//   @Column('tinyint', { name: 'Active', width: 1 })
//   active: boolean;

//   @OneToMany(() => Customer, (customer) => customer.companyType)
//   customers: Customer[];
// }
