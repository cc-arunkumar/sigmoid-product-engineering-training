const products = require("../data/Products");

//GET ALL
exports.getAllProducts=(req,res)=>{
    res.json(products);// getting from data->Products.js conversion in  controller 
};//get back to routes