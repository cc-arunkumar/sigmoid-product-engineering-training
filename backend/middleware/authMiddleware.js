const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
    try{
        let token;
        // 1. Extract token from Authorization header
        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
         // 2. Check if token exists
        if(!token){
            return next(new AppError("Access denied. No token provided.", 401));
        }
            // 3. Verify token
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
        // 4. Attach user info to request object
        req.user = decoded;
        next();
    }
    catch(err){
        // Handle token verification errors
        if(err.name === "JsonWebTokenError"){
            return next(new AppError("Invalid token.", 401));
        }
        if(err.name === "TokenExpiredError"){
            return next(new AppError("Token expired.", 401));
        }

        return next(new AppError("Authentication failed.", 401));
    }
};

module.exports = protect;