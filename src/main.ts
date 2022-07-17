import 'dotenv-defaults/config';

import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpServer } from './httpServer/http.server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error', 'verbose'],
  });
  app.useLogger(app.get(Logger));
  app.enableCors();

  const httpServer: HttpServer = app.get(HttpServer);

  httpServer.startListening();
}

bootstrap();
