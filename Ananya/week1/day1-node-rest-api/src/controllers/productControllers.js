const products = require("../data/product");

exports.getAllProducts=(req, res)=>{
    res.json(products);
}

exports.getProductById= (req, res)=>{
    const productId= parseInt(req.params.id);
    const product= products.find(p=>p.id===productId);
    if(!product){
        return res.status(400).json({
            message:"product not found"
        })
    }
    res.json(product);
}