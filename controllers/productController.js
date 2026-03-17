const products = require("../data/products")
exports.getALLProducts = (req, res) => {
    res.json(products);
};
exports.getProductById = (req , res) => {

    const productid = parseInt(req.params.id);
    
    const product = products.find( p => p.id === productid);

    if(!product){
       return  res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.json(product);

}
