import { Column, Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from '../../core/my-base.entity';
import { Invoice } from './invoice.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Currency extends MyBaseEntity {
  @Column('varchar', { length: 100 })
  currencyName: string;

  @Column('char', { unique: true, length: 3 })
  iso4217Iso: string;

  @OneToMany(() => Invoice, (invoice) => invoice.currency)
  invoices: Invoice[];

  @OneToMany(() => Product, (product) => product.currencyId)
  products: Product[];
}
