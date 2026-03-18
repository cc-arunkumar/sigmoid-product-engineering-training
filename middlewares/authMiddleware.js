import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
const protect=(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token) return next(new AppError("Unauthorized", 401)    )
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
        req.user=decoded;
        next();
    } catch (error) {
        return next(new AppError("Invalid token",401))
    }
}
export default protect;
