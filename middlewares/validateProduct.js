const validateProduct = (req, res, next) => 
    {

const {name,price} = req.body;

if(!name || name.trim() === ""){
    return res.status(400).json({
        success: false,
        message: "product name is required"

    });
}
if(price === undefined || price<=0){
    return res.status(400).json({
        success:false,
        message: "Price must be greater than 0"
    });

}

next();
};

module.exports = validateProduct;