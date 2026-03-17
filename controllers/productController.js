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

