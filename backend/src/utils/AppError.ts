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

  toJSON(includeStack = env.NODE_NEV === "dev") {}
}
