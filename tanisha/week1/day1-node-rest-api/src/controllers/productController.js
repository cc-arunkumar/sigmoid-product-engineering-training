const products = require("../data/product");
exports.getAllProducts = (req,res)=>{
    res.json(products);
};
exports.getProductsById = (req,res)=>{
    const productID=parseInt(req.params.id);
    const product=products.find(p=>p.id===productID);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    res.json(product);
}
