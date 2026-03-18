import { AppError } from "../utils/AppError.js";
const authorize=(...allowedRoles)=>{
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Unauthorized: No user data available", 401));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden: Insufficient permissions", 403));
        }

        next();
    };
};
export default authorize;