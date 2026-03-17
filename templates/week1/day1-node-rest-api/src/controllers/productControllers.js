const products=require("../data/products.js");
exports.getAllProducts=(req,res)=>{
    res.json(products);
}






