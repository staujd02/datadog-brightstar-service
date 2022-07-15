import { Injectable, Logger, Scope } from '@nestjs/common';
import { Logger as LocalLogger } from './logger';

@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLogger implements LocalLogger {
  logError(name: string, message: string, stack: string) {
    const logMessage = `Error Name: ${name}, Message: ${message}, Stack Trace: ${stack}, Time: ${new Date().toISOString()}`;
    Logger.log(logMessage);
  }
}
