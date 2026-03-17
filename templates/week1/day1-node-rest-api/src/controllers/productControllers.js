
const products = require("../data/products");
exports.getAllProducts =(req,res)=>{
    res.json(products);
};
exports.getProductById=(req,res)=>{
 const ProductId=parseInt(req.params.id);
 const product=products.find((p)=>p.product_id===ProductId);
 if(!product){
     return res.status(404).json({
         message:"Product not found"
     })
 }
 res.json(product);
}