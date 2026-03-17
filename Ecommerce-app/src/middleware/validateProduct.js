const validateProduct = (req,res,next) => {
    const {name,price,category,stock} = req.body;

    if(!name || !price || !category || !stock){
        return res.status(400).json({
            message : "All fields are required"
        })
    }

    if(typeof name !== "string" || typeof category !== "string" || name.trim() === "" || category.trim() === "" ){
        return res.status(400).json({
            message : "name and category should be string"
        })
    }

    if(typeof price !== "number" || typeof stock !== "number" || price < 0 || stock < 0){
        return res.status(400).json({
            message : "price and stock should be number and non negative"
        })
    }

    next();
}

module.exports = validateProduct;