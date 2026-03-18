const validateProductPatch = (req, res, next) => {
    const { name, price, category, stock } = req.body;

    if(name){
        if(name.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            })
        };
    }

    if(price !== undefined){
        if(price <= 0){
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0"
            })
        };
    }

    if(category){
        if(category.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Category is required"
            })
        };
    }

    if(stock !== undefined){
        if(stock < 0){
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            })
        };
    }

    next()
}

module.exports = validateProductPatch