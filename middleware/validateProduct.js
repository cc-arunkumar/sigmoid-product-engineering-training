const validateProduct=(req,res,next)=>{
    const {name, price, category, stock}=req.body;

    if(!name||name.trim()===""){
        return res.status(400).json({
            status:false,
            message:"Product name is required"
        });
    }

    if(price===undefined||price<=0){
        return res.status(400).json({
            status:false,
            message:"Price must be greater than 0"
        });
    }

    if(!category||category.trim()===""){
        return res.status(400).json({
            status:false,
            message:"Category is required"
        });
    }

    if(stock===undefined||stock<0){
        return res.status(400).json({
            status:false,
            message:"Stock cannot be negative"
        });
    }

    next();
;}

module.exports=validateProduct;