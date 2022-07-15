export interface Logger {
  logError(name: string, message: string, stack: string): void;
}
