const validateProductPartial = (req, res, next) => {
    const {name, price, category, stock} = req.body;

    if(name !== undefined && name.trim() === ""){
        const error = new Error("Name is required");
        error.statusCode = 404;
        return next(error);
    }

    if(price !== undefined && price < 0){
        const error = new Error("Price should be greater than 0");
        error.statusCode = 404;
        return next(error);
    }

    if(category !== undefined && category.trim() === ""){
        const error = new Error("Category name is required");
        error.statusCode = 404;
        return next(error);
    }

    if(stock !== undefined && stock < 0){
        const error = new Error("Stock should be greater than 0");
        error.statusCode = 404;
        return next(error);
    }
    next();
}

module.exports = validateProductPartial;