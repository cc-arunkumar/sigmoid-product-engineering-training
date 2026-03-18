import { AppError } from "../utils/AppError.js";
const errorHandler=(err,req,res,next)=>{
    console.error("ERROR:", {
        message: err?.message,
        statusCode: err?.statusCode,
        stack: err?.stack

    })
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    if (err && typeof err === "object") {
        const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
        const message = typeof err.message === "string" ? err.message : "Internal Server Error";
        const appError = new AppError(message, statusCode);
        return res.status(appError.statusCode).json(appError.toJSON());
    }

    const appError = new AppError("Internal Server Error", 500);
    return res.status(appError.statusCode).json(appError.toJSON());
}
export default errorHandler;
