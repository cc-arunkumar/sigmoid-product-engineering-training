const validateUser=(req,res,next)=>{
    const {name,email,password}=req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({status: false,message:"User name is required"});
    }
    if (!email || email.trim() === "") {
        return res.status(400).json({status: false,message:"User email is required"});
    }
    if (!password || password.trim() === "") {
        return res.status(400).json({status: false,message:"User password is required"});
    }
    next();

    // console.log("BODY:", req.body);
}

module.exports=validateUser;