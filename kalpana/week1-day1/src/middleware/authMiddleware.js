const jwt = require("jsonwebtoken");

const appError = require("../utils/appError");

const protect = (req, res, next) => {
    try {
        let token;

        //extract token from authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        //if not token
        if (!token) {
            return next(new appError("access denied to token provided", 401));
        }

        //varify token
        const decode = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

        //attach user info to request

        req.user = decode;
        next();
    }
    catch (error) {
    // Handle JWT specific errors
        if (error.name === "JsonWebTokenError") {
            return next(new appError("Invalid token", 401));
        }
        if (error.name === "TokenExpiredError") {
            return next(new appError("Token expired", 401));
        }
    return next(new appError("Authentication failed", 401));
}
}

module.exports= protect;