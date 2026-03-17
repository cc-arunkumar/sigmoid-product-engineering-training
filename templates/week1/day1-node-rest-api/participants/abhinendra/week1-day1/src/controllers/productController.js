let products = require ("../data/products");

exports.getAllProducts= (req, res)=>{
    res.json(products);
};

exports.getProductByID= (req,res)=>{
    const productID= parseInt(req.params.id);

    const  product = products.find( p => p.id=== productID);

    if(!product){
        return res.status(404).json({
            message : "Product not Found"
        });
    }
        res.json(product);
};