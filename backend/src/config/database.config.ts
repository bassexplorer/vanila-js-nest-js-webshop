import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  // check if the app is in production mode or not.
  private isProduction() {
    const mode = this.configService.get<string>('mode', 'dev');
    return mode === 'production';
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let pathName;

    if (this.isProduction()) {
      pathName = path.join(__dirname, '..', '..', 'build');
    } else {
      pathName = path.join(__dirname, '..', '..', 'src');
    }

    return {
      type: 'mysql',

      host: this.configService.get<string>('db.host'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.database'),

      entities: [path.join(pathName, '/**/*.entity.{ts,js}')],
      dropSchema: this.configService.get<boolean>('db.dropSchema'),
      migrationsTransactionMode: 'each',
      migrationsRun: this.configService.get<boolean>('db.migrationsRun'),
      migrations: [path.join(pathName, '/migration/**')],
      cli: {
        migrationsDir: path.join(pathName, '/migration'),
      },
      synchronize: this.configService.get<boolean>('db.synchronize', false),

      ssl: this.configService.get('db.ssl', false),
      logging: this.configService.get('db.logging', false),
    };
  }
}
