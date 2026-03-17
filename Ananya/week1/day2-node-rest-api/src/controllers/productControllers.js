const products = require("../data/product");
const {successResponse}= require("../utils/apiResponse")

exports.getAllProducts=(req, res)=>{
    successResponse(res, products, "Product fetched");
}

exports.getProductById= (req, res, next)=>{
    const productId= parseInt(req.params.id);
    const product= products.find(p=>p.id===productId);
    if(!product){
        const error= new Error("product not found");
        error.statusCode=404;
        next(error);
        
    }
     successResponse(res, product, "Product fetched");
    
}



exports.createProduct = (req,res)=>{
    
    const{name, price, category,stock}=req.body;

    const newP={
        id: products[products.length-1].id+1,
        name: name,
        price: price,
        category: category,
        stock: stock
    }
    console.log("Newly created Product = ",newP)
    products.push(newP);
    successResponse(res, newP, "Product fetched",201);
}

exports.updateP= (req,res,next)=>{
    const productID= req.params.id*1;
    const product= products.find(p=>p.id===productID);
    if(!product){
        const error= new Error("product not found");
        error.statusCode= 404;
        next(error);
    }
    const{name, price, category,stock}=req.body;

    product.name= name;
    product.price= price;
    product.category= category;
    product.stock= stock;

     successResponse(res, product, "Product fetched");
}
exports.deleteP =(req,res)=>{
    const productID= req.params.id*1;
    const product= products.findIndex(p=>p.id===productID);
    if(product===-1){
        const error= new Error("product not found");
        error.statusCode= 404;
        next(error);
    }
    products.splice(product,1);
    successResponse(res, null, "Product DELETED",204);
}

exports.patchP= (req,res)=>{
    const productID= req.params.id*1;
    const product= products.find(p=>p.id===productID);
    if(!product){
        const error= new Error("product not found");
        error.statusCode= 404;
        next(error);
    }
    const{name, price, category,stock}=req.body;
    if(name!=undefined){
        product.name= name;
    }
    if(price!=undefined){
        product.price= price;
    }
    if(category!=undefined){
        product.category= category;
    }
    if(stock!= undefined){
        product.stock= stock;
    }
     successResponse(res, product, "product updated");

}
