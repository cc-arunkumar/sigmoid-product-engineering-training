const validateProduct = (req,res,next) =>{
    const {name, price, category, stock}= req.body;

    if(!name || name.trim()==="" || name.trim().length<0 || name.trim().length>50){
        return res.status(400).json({
            success:false,
            message: "Product name is required"
        })
    }
    if(price ===undefined || price<=0 ){
        return res.status(400).json({
            success:false,
            message: "Product price is required"
        })
    }
    if(!category || category.trim()===""){
        return res.status(400).json({
            success:false,
            message: "Product category is required"
        })
    }
    if(stock===undefined || stock<0){
        return res.status(400).json({
            success:false,
            message: "Product stock is required"
        })
    }
    next();
}
module.exports=validateProduct;