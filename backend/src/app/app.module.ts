import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/config';
import { TypeOrmConfigService } from '../config/database.config';
import { CustomersModule } from '../customer/customers.module';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Load all of the configuration data from the config folder and initialize config module
    ConfigModule.forRoot({
      load: [configuration],
    }),

    // initialize TypeOrmModul and pass in all database config with the config service
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    CustomersModule,
    ProductModule,
    OrderModule,
    // include other modules that the application contains
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
