export declare enum TalentErrorCode {
    CONNECTION_FAILED = "CONNECTION_FAILED",
    SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    NETWORK_ERROR = "NETWORK_ERROR",
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
    INVALID_CONFIGURATION = "INVALID_CONFIGURATION",
    TRACK_ERROR = "TRACK_ERROR",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
export interface ErrorDetails {
    originalError?: Error | unknown;
    stack?: string;
    [key: string]: unknown;
}
export declare class TalentError extends Error {
    readonly code: TalentErrorCode;
    readonly details?: ErrorDetails;
    readonly timestamp: number;
    constructor(message: string, code?: TalentErrorCode, details?: ErrorDetails);
    toJSON(): Record<string, unknown>;
}
export declare class TalentConnectionError extends TalentError {
    constructor(message: string, details?: ErrorDetails);
}
export declare class TalentAuthenticationError extends TalentError {
    constructor(message: string, details?: ErrorDetails);
}
export declare class TalentNetworkError extends TalentError {
    constructor(message: string, details?: ErrorDetails);
}
export declare class TalentPermissionError extends TalentError {
    constructor(message: string, details?: ErrorDetails);
}
export declare function wrapError(error: unknown, defaultMessage?: string): TalentError;
export declare function createTypedError(message: string, originalError?: unknown): TalentError;
//# sourceMappingURL=errors.d.ts.map