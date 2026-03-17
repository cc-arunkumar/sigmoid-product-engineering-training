let products = require("../Data/products");

function getAllProducts(req,res){
    res.json(products);
}