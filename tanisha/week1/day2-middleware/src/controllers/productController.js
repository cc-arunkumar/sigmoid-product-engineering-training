const products = require("../data/product");
const successResponse=require("../utils/apiResponse");
exports.getAllProducts = (req,res)=>{
    successResponse(res,products,"All products fetched");
};
exports.getProductsById = (req,res,next)=>{
    const productID=parseInt(req.params.id);
    const product=products.find(p=>p.id===productID);
    if(!product){
        const error=new Error("Product not found");
        return next(error);
    }
    successResponse(res,product,"Product by id fetched");
}
//post
exports.createProducts=(req,res)=>{
    const{name,price,category,stock}=req.body;
    const newProduct={
        id:100+products.length +1,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
    products.push(newProduct);
     successResponse(res,newProduct,"added new products");
}
//put
exports.updateProduct=(req,res,next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        return next(error);
    }
    const{name,price,category,stock}=req.body;
    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;
     successResponse(res,product,"Product updated");
}
//patch
exports.updatePartialProduct=(req,res,next)=>{
const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        return next(error);
    }
    const{name,price,category,stock}=req.body;
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
     successResponse(res,product,"product partially updated");;
}
//delete
exports.deleteProduct=(req,res,next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        return next(error);
    }
    products.splice(product,1);
     successResponse(res,null,"product deleted");
}