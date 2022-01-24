import { Column, Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from '../../core/my-base.entity';
import { Product } from './product.entity';

@Entity()
export class Productcategory extends MyBaseEntity {
  // @PrimaryGeneratedColumn()
  // productCategoryId: number;

  @Column('varchar', { length: 100 })
  productCategoryName: string;

  @OneToMany(() => Product, (product) => product.productCategory)
  products: Product[];
}
