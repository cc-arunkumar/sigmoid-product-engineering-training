import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { AppResponse} from "../utils/AppResponse.js";
// Hardcoded user for demonstration
const USERS=[
    {
        id:1,
        username:"admin",
        password:"1234",
        role:"admin"
    },
    {
        id:2,
        username:"user",
        password:"1234",
        role:"user"
    }
]

function login(req, res, next){
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return next(new AppError("Username and password are required", 400));
        }
        const user=USERS.find(u=>u.username===username)
        if(!user || user.password !== password){
            return next(new AppError("Invalid username or password", 401));
        }
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
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

