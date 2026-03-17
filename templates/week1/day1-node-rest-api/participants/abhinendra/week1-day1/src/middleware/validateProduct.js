const validateProduct = ( req, res , next)=>{
    const {name, price, category , stock}= req.body;

    if(!name || name.trim=== ""){
        return res.status(400).json({
            success: false,
            message: " Product Name is Required"
        });
    }

    if(price===undefined || price <= 0){
        return res.status(400).json({
            success: false,
            message: "Price must be Greater than 0"
        });
    }

    if(!category || category.trim===""){
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    if(stock === undefined || stock <0){
        return res.status(400).json({
            success: false,
            message: "Stock should be greater than 0"
        });
    }

    next();
}

module.exports= validateProduct;