// const jwt = require("jsonwebtoken");
// const {successResponse} = require("../utils/apiResponse");
// const AppError = require("../utils/AppError");


// // hardcoded user (for training purpose)
// const USER = [{
//   id : 1,
//   username : "admin",
//   password : "1234",
//   role  : "admin"
// },{
//   id : 2,
//   username : "user",
//   password : "1234",
//   role  : "user"
// }

// ];

// exports.login = (req, res , next) =>{
//   try{
//     const {username , password} = req.body;

//     // 1. validate input
//     if(!username || !password){
//       return next(new AppError("username and password required", 400))
//     }


//     // 2. validate user)
//     if(username !== USER.username || password !== USER.password){
//       return next(new AppError("incorrect credentials", 401))
//     }

//     // 3. generate token


//     // 3. generate token
//     const token = jwt.sign(
//       {
//         userId: USER.id,
//         username: USER.username
//       },
//       process.env.JWT_SECRET || "mysecretkey", 
//       {
//         expiresIn: "1h" // 
//       }
//     );


//     // send response
//     return successResponse(res, "login successful", {token});
//   }

//   catch(error){
//     return next(new AppError(error.message || "login failed", 500));

//   }
// }



const jwt = require("jsonwebtoken");
const {successResponse} = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

const USER = [
    {
        id: 1, 
        username: "admin",
        password: "1234",
        role: "admin"
    },
    {
        id: 2, 
        username: "user",
        password: "1234",
        role: "user"
    }
]

exports.login = (req, res, next) => {
    try{
        const { username, password } = req.body;

        // Validate Input
        if(!username || !password){
            return next(new AppError("Username and password are required", 400));
        }

        // Find user
        const user = USER.find(u => u.username === username);

        if(!user|| user.password !== password){
            return next(new AppError("Invalid credentials", 401));
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || "mysecretkey",{
                expiresIn: "1h"
            }
        );
        return successResponse(res, "Login Successful", {token});
    }
    catch(error){
        return next(new AppError(error.message || "Login Failed", 500))
    }
};