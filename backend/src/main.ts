import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get<number>('server.port', 3000);

  await app.listen(port, () => {
    Logger.log(
      `Listening at http://localhost:${port}/${globalPrefix}`,
      NestApplication.name,
    );
  });
}

bootstrap();
