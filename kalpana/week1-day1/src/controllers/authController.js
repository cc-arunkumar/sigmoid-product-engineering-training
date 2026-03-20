const jwt = require("jsonwebtoken");

const { successResponse } = require("../utils/apiResponse");
const appError = require("../utils/appError");

//hardcoded user (for training purpose)
const USERS = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin"
    },
    {
        id: 2,
        username: "user",
        password: "user123",
        role: "user"
    }
]


exports.login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        //validate input
        if (!username || !password) {
            return next(new appError("username and password are required", 400));
        }

        //find user
        const user = USERS.find(u => u.username === username);

        //check credentials
        if (!user || user.password !== password) {
            return next(new appError("Invalid Credentials", 401));
        }


        //generate token with role

        const token = jwt.sign(

            {

                id: user.id,

                role: user.role

            },

            process.env.JWT_SECRET,

            { expiresIn: "1h" }

        );

        //send response
        return successResponse(res, "Login Sucessfully", { token });
    }
    catch (error) {
        return next(new appError(error.message) || "Login Failed", 500);
    }
};