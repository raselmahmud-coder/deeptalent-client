export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    SILENT = 4
}
export declare class TalentLogger {
    private static instance;
    private logLevel;
    private prefix;
    static getInstance(): TalentLogger;
    setLogLevel(level: LogLevel): void;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, error?: any, ...args: any[]): void;
}
export declare const logger: TalentLogger;
export declare const debug: (message: string, ...args: any[]) => void;
export declare const info: (message: string, ...args: any[]) => void;
export declare const warn: (message: string, ...args: any[]) => void;
export declare const error: (message: string, error?: any, ...args: any[]) => void;
//# sourceMappingURL=logger.d.ts.map