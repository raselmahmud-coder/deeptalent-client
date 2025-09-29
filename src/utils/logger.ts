// src/utils/logger.ts
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

export class TalentLogger {
  private static instance: TalentLogger;
  private logLevel: LogLevel = LogLevel.INFO;
  private prefix = '[DeepTalent]';

  static getInstance(): TalentLogger {
    if (!TalentLogger.instance) {
      TalentLogger.instance = new TalentLogger();
    }
    return TalentLogger.instance;
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  debug(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`${this.prefix} [DEBUG]`, message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`${this.prefix} [INFO]`, message, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`${this.prefix} [WARN]`, message, ...args);
    }
  }

  error(message: string, error?: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`${this.prefix} [ERROR]`, message, error, ...args);
    }
  }
}

// Export singleton instance
export const logger = TalentLogger.getInstance();

// Export convenience functions
export const debug = logger.debug.bind(logger);
export const info = logger.info.bind(logger);
export const warn = logger.warn.bind(logger);
export const error = logger.error.bind(logger);
