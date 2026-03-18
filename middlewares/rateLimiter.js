import rateLimit from "express-rate-limit";
import { AppError } from "../utils/AppError.js";
// General Api limiter;
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        return next(new AppError("Too many requests, please try again later.", 429));
    }
});

// strict limiter for auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        return next(new AppError("Too many login attempts, please try again later.", 429));
    }
});

export { apiLimiter, authLimiter };
