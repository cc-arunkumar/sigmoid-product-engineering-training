const jwt = require("jsonwebtoken");
const {successResponse} = require("../utils/apiResponse");
const AppError = require("../utils/AppError");


// hardcoded user (for training purpose)
const USER = {
  id : 1,
  username : "admin",
  password : "1234"
};

exports.login = (req, res , next) =>{
  try{
    const {username , password} = req.body;

    // 1. validate input
    if(!username || !password){
      return next(new AppError("username and password required", 400))
    }


    // 2. validate user)
    if(username !== USER.username || password !== USER.password){
      return next(new AppError("incorrect credentials", 401))
    }

    // 3. generate token


    // 3. generate token
    const token = jwt.sign(
      {
        userId: USER.id,
        username: USER.username
      },
      process.env.JWT_SECRET || "mysecretkey", 
      {
        expiresIn: "1h" // 
      }
    );


    // send response
    return successResponse(res, "login successful", {token});
  }

  catch(error){
    return next(new AppError(error.message || "login failed", 500));

  }
}