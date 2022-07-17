import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';
import { HttpServerModule } from './httpServer/http.server.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';
import { AppService } from './app.service';
import { ConsoleLogger } from './logging/consoleLogger';
import { ServerModule } from './server/server.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    configureConfigModel(),
    configureHealthCheck(),
    configurePinoLogging(),
    configureMetrics(),
    HttpServerModule,
    WebSocketModule,
    ServerModule,
  ],
  providers: [
    AppService,
    HttpServerModule,
    {
      provide: 'LOGGING_METHOD',
      useClass: ConsoleLogger,
      inject: [],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //TODO: Add controllers to response time.
    consumer.apply(ResponseTimeMiddleware).forRoutes();
  }
}

function configureConfigModel() {
  return ConfigModule.forRoot({
    isGlobal: true,
  });
}

function configureHealthCheck() {
  return TerminusModule;
}

function configurePinoLogging() {
  return LoggerModule.forRoot({
    pinoHttp: {
      level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
      transport:
        process.env.NODE_ENV === 'local'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'SYS:mm/dd/yyyy, hh:MM:ss TT Z',
                singleLine: false,
              },
            }
          : undefined,
    },
    exclude: [
      { method: RequestMethod.ALL, path: 'health' },
      { method: RequestMethod.ALL, path: 'metrics' },
    ],
  });
}

function configureMetrics() {
  return PrometheusModule.register();
}