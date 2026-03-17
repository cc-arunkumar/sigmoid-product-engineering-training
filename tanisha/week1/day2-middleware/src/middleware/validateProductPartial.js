const validateProductPartial =(req,res,next)=>{
    const {name,price,category,stock}=req.body;
    if(name!==undefined&&name.trim()===""){
        return res.status(400).json({
            success:false,
            message:"product name is required"
        })
    }
    if(price!==undefined&&price<=0){
        return res.status(400).json({
            success:false,
            message:"price must be greater than zero"
        })
    }
    if(category!==undefined&&category.trim()===""){
        return res.status(400).json({
            success:false,
            message:"category is required"
        })
    }
    if(stock!==undefined&&stock<0){
        return res.status(400).json({
            success:false,
            message:"stock cannot be zero"
        })
    }
   next();
};
module.exports = validateProductPartial;