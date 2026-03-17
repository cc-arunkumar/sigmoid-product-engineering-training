export const validatePatch = (req,res,next) => {
    const {name,price,stock} = req.body;

    if((name!== undefined && name.trim()==="")){
        return res.status(400).json({
            success:false,
            message:"Product name should not be empty"
        });
    }
    if(price!==undefined && price <= 0){
        return res.status(400).json({
            success : false,
            message:"Product Price invalid value"
        });
    }
    if(stock!==undefined && stock < 0){
        return res.status(400).json({
            success:false,
            message:"Product stock invalid value"
        });
    }
    next();
}