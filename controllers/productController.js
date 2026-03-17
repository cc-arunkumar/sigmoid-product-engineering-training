const e = require("express");
const products=require ("../data/products")

exports.getProducts=(req,res)=>{
    res.json(products);
};

exports.getProductById=(req,res,next)=>{
    const pId=parseInt(req.params.id);
    const product=products.find(p=>p.id===pId);
    if(!product){
        const error=new Error("Product not found");
        error.statusCode=404;
        return next(error);
    }
    res.send(product);
};

exports.createProduct=(req,res)=>{
    const {name,price,category,stocks}=req.body;
    const newProduct={
        id:products.length+1,
        name:name,
        price:price,
        category:category,
        stocks:stocks
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};


exports.updateProduct=(req,res,next)=>{
    const pId=req.params.id*1;
    const product=products.find(p=>p.id===pId);
    if(!product){
        const error=new Error("Product not found");
        error.statusCode=404;
        return next(error);
    }
    const {name,price,category,stocks}=req.body;
    product.name=name || product.name;
    product.price=price || product.price;
    product.category=category || product.category;
    product.stocks=stocks || product.stocks;

    res.json(product);
};
exports.deleteProduct=(req,res,next)=>{
    const pId=req.params.id*1;
    const productIndex=products.findIndex(p=>p.id===pId);
    if(productIndex===-1){
        const error=new Error("Product not found");
        error.statusCode=404;
        return next(error);
    }
    products.splice(productIndex,1);
    res.json({message:"Product deleted successfully"});
}

exports.updatePartialProduct=(req,res,next)=>{
    const pId=req.params.id*1;
    const product=products.find(p=>p.id===pId);
    if(!product){
        const error=new Error("Product not found");
        error.statusCode=404;
        return next(error);
    }
    const {name,price,category,stocks}=req.body;
    if(name != undefined) product.name=name;
    if(price != undefined) product.price=price;
    if(category != undefined) product.category=category;
    if(stocks != undefined) product.stocks=stocks;

    res.status(200).json(product);
};