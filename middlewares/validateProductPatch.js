const validateProductPatch=(req,res,next)=>{
    const {name,price,category,stock}=req.body
    if(name){
        if(name.trim()===""){
            return res.status(400).json({
                success:false,
                message:"Name and price are required"
            })
      }
    }
    if(price){
        if(price <= 0){
            return res.status(400).json({
                success:false,
                message:"Price must be a positive number"
            })
        }
    }
    if(category){
        if(category.trim()===""){
            return res.status(400).json({
                success:false,
                message:"Category must be a non-empty string"
            })
        }
    }
    if(stock){
        if(stock < 0){
            return res.status(400).json({
                success:false,
                message:"Stock must be a positive number"
            })
        }
    }
    next();
}
export default validateProductPatch; 