const products = require("../data/product");
exports.getAllProducts = (req,res)=>{
    res.json(products);
};