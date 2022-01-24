import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { City } from './city.entity';
import { Customer } from '../customer/entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Customer])],
  exports: [TypeOrmModule],
})
export class EntityModule {}
