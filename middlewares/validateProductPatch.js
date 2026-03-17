const validateProductPatch = (req, res, next) => {
    const {name , price} = req.body;

    if(name){
        if(name.trim() === ""){
             return res.status(400).json({
            success: false,
            message: "Product name is Not Valid"
        });
        }
    }
    if(price){
        if(price <= 0){
            return res.status(400).json({
                success: false,
                message: "Price can't be Negative or Zero"
            })
        }
    }

    next();





}
module.exports = validateProductPatch;