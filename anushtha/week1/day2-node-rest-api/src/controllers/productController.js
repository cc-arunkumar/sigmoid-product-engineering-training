 const products=require("../data/products")
 const successResponse=require("../utils/apiResponse.js")
 exports.getAllProducts=(req,res)=>{
    successResponse(res,"All products fetched",products);
 };
exports.getProductById=(req,res,next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    successResponse(res,"Product by id fetched",product);
 }
  exports.createProduct=(req,res)=>{
    const {name,price,category,stock}=req.body;
    const newProduct={
        id:100+products.length + 1,
        name:name,
        price:price,
        category:category,
        stock:stock
    };
    products.push(newProduct);
    successResponse(res,"Added new products",newProduct);
 }
 
 exports.updateProduct=(req,res,next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    const {name,price,category,stock}=req.body;

    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;

    successResponse(res,"Product updated",product);

 }
 exports.deleteProduct=(req,res)=>{
    const productId=req.params.id*1;
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    products.splice(product,1);

    successResponse(res,"Product deleted",null);

}
exports.updatePartialProduct=(req,res,next)=>{
    const productId=req.params.id*1;
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    const {name,price,category,stock}=req.body;
    if(name!=undefined){
        product.name=name;
    }
    if(price!=undefined){
        product.price=price;
    }
    if(category!=undefined){
        product.category=category;
    }
    if(stock!=undefined){
        product.stock=stock;
    }
    successResponse(res,"Product partially updated",product);

}