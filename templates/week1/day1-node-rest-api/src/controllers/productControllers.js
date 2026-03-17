
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
exports.createProduct=(req,res)=>{
    const{product_name,product_price,category,stock}=req.body;
    const new_product={
       
            product_id: products.length + 1,
            product_name: product_name,
            product_price: product_price,
            category: category,
            stock: stock
        };
    
    
    products.push(new_product);
    res.status(201).json({
        message:"Product created successfully"
    })
   }
   exports.updateProduct =(req,res)=> {
    const ProductId=parseInt(req.params.id);
    const product=products.find((p)=>p.product_id===ProductId);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    const{product_name,product_price,category,stock}=req.body;
            product.product_name= product_name,
            product.product_price= product_price,
            product.category= category,
            product.stock= stock,
       
    
    res.status(201).json({
        message:"Product updated successfully"
    })
}