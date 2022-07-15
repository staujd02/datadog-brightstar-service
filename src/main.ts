import 'dotenv-defaults/config';
import './tracer';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { auth, requiresAuth } from 'express-openid-connect';
import { Constants } from './constants';
import { INestApplication } from '@nestjs/common';

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

  await app.listen(8080);
}

function setupSwagger(app: INestApplication, configService: ConfigService) {
  app.use(
    auth({
      authRequired: false,
      auth0Logout: true,
      secret: configService.get<string>(Constants.SwaggerAuth0Secret),
      baseURL: `http://${configService.get<string>(
        Constants.ApplicationBaseUrl,
      )}`,
      clientID: configService.get<string>(Constants.SwaggerAuth0ClientId),
      issuerBaseURL: `https://${configService.get<string>(
        Constants.Auth0Domain,
      )}`,
    }),
  );

  app.use(
    [`/${Constants.SwaggerUIPath}`, `/${Constants.SwaggerUIPath}-json`],
    requiresAuth(),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig, {});
  SwaggerModule.setup(Constants.SwaggerUIPath, app, document);
}

bootstrap();
