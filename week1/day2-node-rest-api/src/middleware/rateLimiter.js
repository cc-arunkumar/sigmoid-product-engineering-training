const rateLimit = require("express-rate-limit");
const AppError = require("../utils/appError");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    return next(
      new AppError("Too many requests, please try again later", 429)
    );
  }
});

// Strict limiter for auth (login protection) - tracks by username
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // only 3 login attempts per username per window
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Track by username to prevent brute force on specific accounts
    return req.body.username || req.body.email || 'unknown';
  },
  handler: (req, res, next) => {
    const identifier = req.body.username || req.body.email || 'unknown';
    return next(
      new AppError(`Too many login attempts for "${identifier}", try again later`, 429)
    );
  }
});

module.exports = {
  apiLimiter,
  authLimiter
};