import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Invoice } from '../../order/entities/invoice.entity';
import { MyBaseEntity } from '../../core/my-base.entity';
@Entity()
export class Customer extends MyBaseEntity {
  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  // These are not important information regarding the registration

  @Column('varchar', { nullable: true, length: 100 })
  address: string | null;

  @Column('varchar', { nullable: true, length: 100 })
  zipcode: string | null;

  @Column('varchar', { nullable: true, length: 100 })
  city: string | null;

  @Column('varchar', { nullable: true })
  country: string | null;

  @Column('varchar', { nullable: true, length: 50 })
  phone: string | null;

  // -------------------------

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @Column('text', { nullable: true })
  bio: string | null;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @Column({ nullable: true })
  @Exclude()
  password: string;

  // Before insert or update into the database encrypt the password
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
