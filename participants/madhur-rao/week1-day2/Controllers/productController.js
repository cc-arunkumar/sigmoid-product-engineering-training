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
    const {name,price,category,stock}=req.body;
    const product = {
        id:products.length + 1,
        name:name,
        price:price,
        category:category,
        stock:stock
    };
    products.push(product);
    return res.status(201).json(product);
}

function updateProduct(req,res){
    const productId=parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if(!product){
        return res.status(404).json({
            message:"Product Not Found"
        });
    }
    const {name,price, category, stock} = req.body;
    product.name=name;
    product.price=price;
    product.category=category;
    product.stock = stock;

    return res.status(200).json(product);
}

function deleteProduct(req,res){
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message:"Product Not Found"
        });
    }

    const remainingProducts = products.filter(p => p.id!=productId);
    products = remainingProducts;

    return res.status(200).json({
        message:"Deleted Successfully"
    });
}

function updatePartialProduct(req,res){
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message:"Product Not Found"
        });
    }

    const {name,price,category,stock} = req.body;
    if(name !== undefined) product.name=name;
    if(price !== undefined) product.price = price;
    if(category !== undefined) product.category = category;
    if(stock !== undefined) product.stock = stock;

    return res.status(200).json(product);
}

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,updatePartialProduct};