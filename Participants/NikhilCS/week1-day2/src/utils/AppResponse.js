class AppResponse {
  constructor({ statusCode = 200, data = null, message = "Success" } = {}) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }

  send(res) {
    return res.status(this.statusCode).json(this.toJSON());
  }
}

export { AppResponse };
