const validatepatchProduct = (req, res, next) => 
    {

const {name,price,stock,category} = req.body;

if(name   !== undefined && name.trim() === ""){
    return res.status(400).json({
        success: false,
        message: "product name is required"

    });
}
if( price !== undefined && price<=0){
    return res.status(400).json({
        success:false,
        message: "Price must be greater than 0"
    });

}
if( stock !== undefined && stock<0){
    return res.status(400).json({
        success:false,
        message: "Stock must be a non-negative number"
    });

}
if( category !== undefined && category.trim() === ""){
    return res.status(400).json({
        success:false,
        message: "Category is required"
    });
}


next();
};

module.exports = validatepatchProduct;