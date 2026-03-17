const errorhandler=(err, req, res, next)=>{

    console.error(err.stack);

    const statuscode=err.statuscode||500

    res.status(statuscode).json({
        message:err.message || "internal server error"
    })
}


module.exports=errorhandler;