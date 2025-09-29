// src/utils/errors.ts - Replace any with proper types
export enum TalentErrorCode {
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  INVALID_CONFIGURATION = 'INVALID_CONFIGURATION',
  TRACK_ERROR = 'TRACK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface ErrorDetails {
  originalError?: Error | unknown;
  stack?: string;
  [key: string]: unknown;
}

export class TalentError extends Error {
  public readonly code: TalentErrorCode;
  public readonly details?: ErrorDetails;
  public readonly timestamp: number;

  constructor(
    message: string, 
    code: TalentErrorCode = TalentErrorCode.UNKNOWN_ERROR,
    details?: ErrorDetails
  ) {
    super(message);
    this.name = 'TalentError';
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TalentError);
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

export class TalentConnectionError extends TalentError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, TalentErrorCode.CONNECTION_FAILED, details);
    this.name = 'TalentConnectionError';
  }
}

export class TalentAuthenticationError extends TalentError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, TalentErrorCode.AUTHENTICATION_FAILED, details);
    this.name = 'TalentAuthenticationError';
  }
}

export class TalentNetworkError extends TalentError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, TalentErrorCode.NETWORK_ERROR, details);
    this.name = 'TalentNetworkError';
  }
}

export class TalentPermissionError extends TalentError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, TalentErrorCode.PERMISSION_DENIED, details);
    this.name = 'TalentPermissionError';
  }
}

// Helper function to wrap unknown errors
export function wrapError(error: unknown, defaultMessage = 'An unknown error occurred'): TalentError {
  if (error instanceof TalentError) {
    return error;
  }

  if (error instanceof Error) {
    return new TalentError(error.message, TalentErrorCode.UNKNOWN_ERROR, {
      originalError: error,
      stack: error.stack,
    });
  }

  return new TalentError(defaultMessage, TalentErrorCode.UNKNOWN_ERROR, { originalError: error });
}

// Helper function to determine error type based on message patterns
export function createTypedError(message: string, originalError?: unknown): TalentError {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('connection') || lowerMessage.includes('connect')) {
    return new TalentConnectionError(message, { originalError });
  }

  if (lowerMessage.includes('auth') || lowerMessage.includes('token') || lowerMessage.includes('unauthorized')) {
    return new TalentAuthenticationError(message, { originalError });
  }

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('timeout')) {
    return new TalentNetworkError(message, { originalError });
  }

  if (lowerMessage.includes('permission') || lowerMessage.includes('denied') || lowerMessage.includes('forbidden')) {
    return new TalentPermissionError(message, { originalError });
  }

  return new TalentError(message, TalentErrorCode.UNKNOWN_ERROR, { originalError });
}