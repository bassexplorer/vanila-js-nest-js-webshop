import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Invoiceline } from '../../order/entities/invoiceline.entity';
import { Productcategory } from './product-category.entity';
import { MyBaseEntity } from '../../core/my-base.entity';
import { Currency } from '../../order/entities/currency.entity';

@Entity()
export class Product extends MyBaseEntity {
  @Column('varchar', { length: 50 })
  partNumber: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  currencyId: number;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('int')
  productCategoryId: number;

  @Column('varchar', { nullable: true, length: 250 })
  imageFile: string | null;

  @OneToMany(() => Invoiceline, (invoiceline) => invoiceline.product)
  invoicelines: Invoiceline[];

  @ManyToOne(
    () => Productcategory,
    (productcategory) => productcategory.products,
  )
  @JoinColumn({ name: 'productCategoryId' })
  productCategory: Productcategory;

  @ManyToOne(() => Currency, (currency) => currency.products)
  @JoinColumn({ name: 'currencyId' })
  currency: Currency;
}
