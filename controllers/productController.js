const e = require("express");
const products=require ("../data/products")

exports.getProducts=(req,res)=>{
    res.json(products);
};

exports.getProductById=(req,res)=>{
    const pId=parseInt(req.params.id);
    const product=products.find(p=>p.id===pId);
    if(!product){
        return res.status(404).json({message:"Product not found"});
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


exports.updateProduct=(req,res)=>{
    const pId=req.params.id*1;
    const product=products.find(p=>p.id===pId);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    const {name,price,category,stocks}=req.body;
    product.name=name || product.name;
    product.price=price || product.price;
    product.category=category || product.category;
    product.stocks=stocks || product.stocks;

    res.json(product);
};
exports.deleteProduct=(req,res)=>{
    const pId=req.params.id*1;
    const productIndex=products.findIndex(p=>p.id===pId);
    if(productIndex===-1){
        return res.status(404).json({message:"Product not found"});
    }
    products.splice(productIndex,1);
    res.json({message:"Product deleted successfully"});
}