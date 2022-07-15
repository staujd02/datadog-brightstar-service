import 'dotenv-defaults/config';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error', 'verbose'],
  });
  app.useLogger(app.get(Logger));
  app.enableCors();


  const configService: ConfigService = app.get(ConfigService);
  // setupSwagger(app, configService);

  // Add this back
  // const port = configService.get<number>(Constants.PortKey);

  await app.listen(8080, '0.0.0.0');
}

bootstrap();
