
const products = require("../data/products");
exports.getAllProducts =(req,res,next)=>{
    res.json(products);
};
exports.getProductById=(req,res,next)=>{
 const ProductId=parseInt(req.params.id);
 const product=products.find((p)=>p.product_id===ProductId);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
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
   exports.updateProduct =(req,res,next)=> {
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
    message: "Product created successfully",
    data: new_product
  });
}
exports.updateProductPartially =(req,res,next)=> {
    const ProductId=parseInt(req.params.id);
    const product=products.find((p)=>p.product_id===ProductId);
   if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
    const{product_name,product_price,category,Stock}=req.body;
    product.product_name = product_name ?? product.product_name;
    product.product_price = product_price ?? product.product_price;
    product.category = category ?? product.category;
    product.Stock = Stock ?? product.Stock;
       
    
    res.status(201).json({
        message:"Product updated successfully partially"
    })
}
exports.deleteProduct = (req, res, next) => {
  const ProductId = parseInt(req.params.id);

  const index = products.findIndex(
    (p) => p.product_id === ProductId
  );

  if (index === -1) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  products.splice(index, 1);

  res.json({
    message: "Product deleted successfully"
  });
};