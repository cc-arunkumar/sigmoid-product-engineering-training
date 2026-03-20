const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = (req , res , next)=>{

    try{
        let token; 
        if(req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return next(new AppError("Access denied . No Token Provided" , 401));
        }

        const decode = jwt.veirfy(
            token , 
            process.env.JWT_SECRET || "merapyaracode"
        );
        req.user = decode ; 
        next();
    }
    catch(error){

        if(error.name =="jsonwebtokenerror"){
            return next(new AppError("Invalid Token" , 401));
        }
        if(error.name ==="Tokenexpirederror"){
            return next(new AppError("Token Expired" , 401)) ; 
        }
        return next(new AppError("authentication failed" , 401));
    }
};


module.exports = protect ; 