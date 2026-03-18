const validate=(req, res , next)=>{
    const { name , price , category , stocks}=req.body;

    if(!name || name.trim==="" || typeof name!=="string"){
        return res.status(400).json({
            success:false,
            message:"please enter valid name"
        })
    }

    if(!price || price<=0 || typeof price!=="number"){
         return res.status(400).json({
            success:false,
            message:"price cannot be negative"
        })
    }
    if(!category || category.trim===""|| typeof category!=="string"){
         return res.status(400).json({
            success:false,
            message:"category is required"
        })
    }
    if(stocks===undefined||stocks<0 || typeof stocks!=="number"){
         return res.status(400).json({
            success:false,
            message:"please enter valid stocks"
        })
    }
    next();

}

module.exports=validate;