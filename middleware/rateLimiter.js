const rateLimiter = require("express-rate-limit");
const AppError = require("../utils/AppError");

const apilimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    return next(new AppError("Too many requests, please try again later", 429));
  },
});

const authlimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next) => {
    return next(
      new AppError("Too many login attempts, please try again later", 429),
    );
  },
});

module.exports = {
  apilimiter,
  authlimiter,
};
