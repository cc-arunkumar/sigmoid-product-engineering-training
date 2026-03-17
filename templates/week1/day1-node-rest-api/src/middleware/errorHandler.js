const errorHandler =(err,req,res,next)=> {
 console.error(err.stack)
 const statuscode=err.statuscode||500;
 res.status(statuscode).json({
    sucess:false,
    message:err.message||"Intenal Server Error"
 })
};
module.exports=errorHandler;
