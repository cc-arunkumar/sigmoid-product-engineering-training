const validateProduct=(req,res,next)=>{
    const {name,price,category,stocks}=req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({status: false,message:"Product name is required"});
    }
    if (price === undefined || price <= 0) {
        return res.status(400).json({status: false,message:"Product price must be a positive number"});
    }
    if (!category || category.trim() === "") {
        return res.status(400).json({status: false,message:"Product category is required"});
    }
    if (stocks === undefined || stocks < 0) {
        return res.status(400).json({status: false,message:"Product stocks must be a non-negative number"});
    }
    next();
}

module.exports=validateProduct;