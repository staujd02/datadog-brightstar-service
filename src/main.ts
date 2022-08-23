import 'dotenv-defaults/config';

import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error', 'verbose'],
  });

  app.useLogger(app.get(Logger));
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 8080);
}

bootstrap();