const jwt=require("jsonwebtoken");
const AppError=require("../utils/appError");

const protect=(req,res, next)=>{
   try{
     let token ;

     if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer ")
     ){
        token=req.headers.authorization.split(" ")[1];
       
        
     }

     if(!token){
        return next(new AppError("Access denied , no token found" , 401))
     }

     const decoded=jwt.verify(
        token,
        process.env.JWT_SECRET || "MYSECRETKEY"
     )

     req.user=decoded;
     next();

   }catch(error){

    if( error.name === "JsonWebTokenError"){
     return next( new AppError("Authorization failed , Invalid Token", 401))
    }

     if( error.name=== "TokenExpiredError" ){
     return next( new AppError("Authorization failed , Token Expire", 401))
    }

       return next( new AppError("Authorization failed ", 401));
   }
}

module.exports=protect;