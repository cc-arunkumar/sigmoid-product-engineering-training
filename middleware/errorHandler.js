const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";

  if (err instanceof AppError) {
    return res.status(statusCode).json({ status, message });
  }

  console.error(err);
  res.status(statusCode).json({ status, message });
};
