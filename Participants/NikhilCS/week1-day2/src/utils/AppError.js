class AppError extends Error {
  constructor(message = "Error", statusCode = 500, errors = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      ...(this.errors ? { errors: this.errors } : {}),
    };
  }
}

export { AppError };
