const jwt = require("jsonwebtoken");
const{successResponse} = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

//dummy user 
const USERS =
[ {
    username: "admin",
    password: "1234",
    role:"admin"
},
{
   username: "user",
    password: "1234",
    role:"user"
}
]

exports.login = (req,res,next)=>{
    try{
        const {username,password} = req.body;

        //1. Validate input
        if(!username || !password){
            return next(new AppError("Username and password are required",400));
        }

        //Find user
        const user = USERS.find(u => u.username === username);

         //2. Checking if credentials match
         if(!user || user.password !== password){
             return next(new AppError("Invalid Credentials",401));
         }

        
        //3. Generate token
        const token = jwt.sign(
            {
            userId: user.id,
            username: user.username,
            role:user.role
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn:"1h"
            }
        );

        //4. Send response
        return successResponse(res,"Login succesful",{token});
    }
    catch(error){
        return next(new AppError(error.message || "Login failed",500));
    }
};