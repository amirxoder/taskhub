import { env } from "../config/env.js";

export class AppError extends Error {
  public readonly status: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    message: string,
    status: number = 500,
    errorCode: string = "INTERNAL_SERVER_ERROR",
    isOperational: boolean = true,
    metadata?: Record<string, unknown>,
  ) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.metadata = metadata;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(
    message = "Bad request",
    errorCode = "BAD_REQUEST",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 400, errorCode, true, metadata);
  }

  static unauthorized(
    message = "Unauthorized",
    errorCode = "UNAUTHORIZED",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 401, errorCode, true, metadata);
  }

  static forbidden(
    message = "Forbidden",
    errorCode = "FORBIDDEN",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 403, errorCode, true, metadata);
  }

  static notFound(
    message = "Resource not found",
    errorCode = "NOT_FOUND",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 404, errorCode, true, metadata);
  }

  static conflict(
    message = "Conflict",
    errorCode = "CONFLICT",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 409, errorCode, true, metadata);
  }

  static validation(
    message = "Validation failed",
    errorCode = "VALIDATION_FAILED",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 422, errorCode, true, metadata);
  }

  static internal(
    message = "Internal server error",
    errorCode = "INTERNAL_SERVER_ERROR",
    metadata?: Record<string, unknown>,
  ) {
    return new AppError(message, 500, errorCode, false, metadata);
  }
}
