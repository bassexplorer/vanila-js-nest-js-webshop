import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../customer/entity/customer.entity';
import { Invoiceline } from './invoiceline.entity';
import { Currency } from './currency.entity';
import { MyBaseEntity } from '../../core/my-base.entity';

@Entity()
export class Invoice extends MyBaseEntity {
  // @PrimaryGeneratedColumn()
  // invoiceId: number;

  @Column('varchar')
  customerId: string;

  @Column('int')
  invoiceNumber: number;

  @Column('tinyint', { width: 1 })
  paid: boolean;

  @Column('datetime', { nullable: true })
  paidDate: Date | null;

  @Column('datetime', {})
  dueDate: Date;

  @Column('text', { nullable: true })
  comment: string | null;

  @Column('varchar')
  currencyId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  address: string;

  @Column('varchar', { length: 100 })
  zipcode: string;

  @Column('varchar', { length: 100 })
  city: string;

  @Column('varchar')
  country: string;

  @ManyToOne(() => Currency, (currency) => currency.invoices)
  @JoinColumn({ name: 'currencyId' })
  currency: Currency;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => Invoiceline, (invoiceline) => invoiceline.invoice)
  invoicelines: Invoiceline[];
}
