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