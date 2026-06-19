// utils/apiError.js

// 1. THE BASE CUSTOM ERROR CLASS
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // Pass message to native JavaScript Error class
    this.statusCode = statusCode;

    // Captures the file system trace where the error occurred
    Error.captureStackTrace(this, this.constructor);
  }
}

// 2. SPECIFIC SUB-CLASSES FOR CLEANER CODE
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized Access") {
    super(401, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}
