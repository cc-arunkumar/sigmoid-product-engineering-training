import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { AppResponse} from "../utils/AppResponse.js";
// Hardcoded user for demonstration
const User = {
    id: 1,
    username: "admin",
    password: "1234"
};

function login(req, res, next){
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return next(new AppError("Username and password are required", 400));
        }
        if(username !== User.username || password !== User.password){
            return next(new AppError("Invalid username or password", 401));
        }
        const token = jwt.sign(
            { userId: User.id, username: User.username },
            process.env.JWT_SECRET || "mysecretkey", 
            { expiresIn: "1h" }
        );
        return new AppResponse({
            data: { token },
            message: "Login successful"
        }).send(res);
    } catch (error) {
        return next(new AppError("An error occurred during login", 500));
    }
}
export { login }

