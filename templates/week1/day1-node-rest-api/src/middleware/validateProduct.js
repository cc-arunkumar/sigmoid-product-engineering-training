const validateProduct = (req, res, next) => {
    const {name, price, category, stock} = req.body;

    if(!name || name.trim() === ""){
        return res.status(400).json({
            status: false,
            message: "Product name is required"
        })
    }

    if(price === undefined || price < 0){
        return res.status(400).json({
            status: false,
            message: "Price should be greater than 0"
        })
    }

    if(!category || category.trim() === ""){
        return res.status(400).json({
            status: false,
            message: "Category name is required"
        })
    }

    if(stock === undefined || stock < 0){
        return res.status(400).json({
            status: false,
            message: "Stock should be greater than 0"
        })
    }
    next();
}

module.exports = validateProduct;