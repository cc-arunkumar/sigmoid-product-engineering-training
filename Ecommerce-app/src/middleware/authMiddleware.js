const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protectRoute = (req, res, next) => {
    try {
        let token;
        //1 .Extract token from authorization header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        //2 .Check if token is present
        if(!token){
            return next(new AppError("Unauthorized access !! No token provided !!",401));
        }

        //3. verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

        //4. Attach user info to request object
        req.user = decoded;

        next();
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            return next(new AppError("Invalid token !!",401));
        } else if(error.name === "TokenExpiredError"){
            return next(new AppError("Token expired !! Please login again !!",401));
        } else {
            return next(new AppError("Error occurred while verifying token !!",500));
        }
    }
}

module.exports = protectRoute;
