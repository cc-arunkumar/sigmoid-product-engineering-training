let products = require("../Data/products");

function getAllProducts(req,res){
    res.json(products);
}

function getProductById(req,res){
    const productId=parseInt(req.params.id);
    console.log(req.params);
    const product=products.find(p => p.id === productId);
    
    if(!product){
        return res.status(404).json({
          message:"Product Not Found"  
        })
    }
    res.json(product);
}

function createProduct(req,res){
    const {name,price}=req.body;
    const product = {
        id:products.length + 1,
        name:name,
        price:price
    };
    products.push(product);
    return res.status(201).json(product);
}