const validateProduct = require("./validateProduct")

const validateProductPartial=(req,res,next)=>{
    const {name,price,category,stocks}=req.body;

    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({status: false,message:"Product name cannot be empty"});
    }  
    if (price !== undefined && price <= 0) {
        return res.status(400).json({status: false,message:"Product price must be a positive number"});
    }
    if (category !== undefined && category.trim() === "") {
        return res.status(400).json({status: false,message:"Product category cannot be empty"});
    }
    if (stocks !== undefined && stocks < 0) {
        return res.status(400).json({status: false,message:"Product stocks must be a non-negative number"});
    }
    next();
}
module.exports=validateProductPartial;