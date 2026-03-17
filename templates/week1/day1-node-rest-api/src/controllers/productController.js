const products=require("../data/products")
exports.getAllProducts=(req,res)=>{
    res.json(products);
}
exports.getProductById=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product)
    {
        return res.status(404).json({
           
            error:`not found this ${productId} in product list`
        });
    }
    res.json(product);
};
exports.createProduct=(req,res)=>{
    const {name,price,category,stock}=req.body;
    const newproduct={
        id:products.length+101,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
   products.push(newproduct)
   res.status(201).json({
    message:"product added successfully"
   })
}