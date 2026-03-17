const products=require("../data/products");

exports.getallproducts=(req, res)=>{
    res.json(products);
} ;



exports.getproductbyId=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        return req.status(400).json({
            message:"data not found"
        })
    }
    res.json(product);
}