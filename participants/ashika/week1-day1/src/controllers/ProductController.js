const products=require("../data/products");

exports.getallproducts=(req, res)=>{
    res.json(products);
} ;
