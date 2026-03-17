exports.successresponse=(res ,message , data , statuscode=200 )=>{
   return res.status(statuscode).json({
    success:true,
    message:message,
    data:data
   })
}
