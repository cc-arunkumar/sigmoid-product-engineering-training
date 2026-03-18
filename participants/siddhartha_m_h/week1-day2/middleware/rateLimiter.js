

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
    handler: (req, res, next) => {
        return next(new AppError("Too many requests, please try again later", 429));
    }
});

const authlImiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,

})