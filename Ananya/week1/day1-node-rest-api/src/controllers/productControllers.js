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

exports.createProduct = (req,res)=>{
    
    const{name, price, category,stock}=req.body;

    const newP={
        id: products[products.length-1].id+1,
        name: name,
        price: price,
        category: category,
        stock: stock
    }
    console.log("Newly created Product = ",newP)
    products.push(newP);
    res.json({
        status:201,
        message:"created"
    })
}
