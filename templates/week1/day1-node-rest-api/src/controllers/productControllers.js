const products=require("../data/products.js");
exports.getAllProducts=(req,res)=>{
    res.json(products);
}
exports.getProductsById=(req,res)=>{
   
    const productId=parseInt(req.params.id);
    console.log(productId)
    const product=products.find(p=>p.id===productId);
    if(!product){
        return res.status(400).json({
            message:"Product not found"
        });
    }
    res.json(product);
};




