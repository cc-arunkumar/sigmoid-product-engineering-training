const jwt = require('jsonwebtoken');
const {successResponse, errorResponse} = require('../utils/apiResponse');
const AppError = require('../utils/appError');

//hardcoded user for demonstration purposes
const user = {
  id: 1,
  username: 'admin',
  password: '1234' // In production, use hashed passwords and a database
};

exports.login = (req, res, next) => {
    try{
        const { username, password } = req.body;

        //validate input
        if(!username || !password) {
            return next(new AppError('Username and password are required', 400));
        }

        //check credentials
        if(username !== user.username || password !== user.password) {
            return next(new AppError('Invalid username or password', 401));
        }

        //generate jwt token
        const token = jwt.sign(
            { 
            userId: user.id,
            username: user.username 
            },
             process.env.JWT_SECRET || "mysecretkey", 
             { 
                expiresIn: '1h' 
            });

            //send response
            return successResponse(res, 'Login successful', { token });

    } catch (error) {
        return next(new AppError(error.message ||'Login Failed', 500));
    }

};
