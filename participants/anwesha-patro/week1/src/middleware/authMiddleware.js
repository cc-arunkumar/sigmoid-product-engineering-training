const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");

const protect = (req, res, next) => {


    try {
        let token;
        // extract token for authrization bearer
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(new AppError("Access Denied! No token provided", 401))
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        )

        req.user = decoded;
        next();
    }
    catch {

        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Inavlid Token", 401))
        }

        if (error.name === "TokenExpiredErroe") {
            return next(new AppError("Token Expired", 401))
        }

        return next(new AppError("Authenticiation", 401))
    }

}

module.exports = protect