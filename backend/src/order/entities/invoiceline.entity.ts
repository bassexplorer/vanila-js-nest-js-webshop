import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Invoice } from './invoice.entity';
import { MyBaseEntity } from '../../core/my-base.entity';
@Entity()
export class Invoiceline extends MyBaseEntity {
  // @PrimaryGeneratedColumn()
  // invoiceLineId: number;

  @Column('varchar')
  invoiceId: string;

  @Column('varchar')
  productId: string;

  @Column('text', { nullable: true })
  lineText: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  price: string;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoicelines)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @ManyToOne(() => Product, (product) => product.invoicelines)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
