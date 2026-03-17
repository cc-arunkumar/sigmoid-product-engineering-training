const validatePartialProduct= (req,res,next)=> {
    const {name, price, category, stock}=req.body;
    
    if(name!==undefined && name.trim()===""){
        return res.status(400).json({
            success:false,
            message: "Product name cannnot be empty"
        })
    }
    if(price !== undefined && price<=0){
         return res.status(400).json({
            success:false,
            message: "Product price cannnot be empty"
        })
    }
    if(category!== undefined && category.trim()===""){
        return res.status(400).json({
            success:false,
            message: "Product category cannnot be empty"
        })
    }
    if(stock!== undefined && stock<=0){
       return res.status(400).json({
            success:false,
            message: "Product stock cannnot be empty"
        })
    }
    next();
}
module.exports=validatePartialProduct;