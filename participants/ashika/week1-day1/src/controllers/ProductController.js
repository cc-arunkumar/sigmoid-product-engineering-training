const products=require("../data/products");

const {successresponse}=require("../utils/apiresponses");


exports.getallproducts=(req, res)=>{
    // res.json(products);

    return successresponse(res, "Product displays", products, 200);
} ;



exports.getproductbyId=(req,res , next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        const error = new Error("ID not found");
        error.statusCode = 404;
        next(error);
    }
    return successresponse(res, "Product get by id ", products, 200);
}

exports.createproducts=(req,res)=>{
    // const newProduct = { id:108, name:"tablet", price:40000 };

    const {name , price, category , stocks}=req.body

    const newProduct={
        id:100+products.length+1,
        name:name,
        price:price,
        category:category,
        stocks:stocks
    }

    products.push(newProduct)

   return successresponse(
        res,
        "Product created successfully",
        newProduct,
        201
    );
    
}


exports.updateProduct=(req,res, next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        const error = new Error("ID not found");
        error.statusCode = 404;
        next(error);

    }   

    const {name , price, category , stocks}=req.body
        
        product.name=name,
        product.price=price,
        product.category=category,
        product.stocks=stocks
    
     return successresponse(res, "Product updated successfully", product, 200);
}


exports.DeletebyId=(req,res, next)=>{
    const productId=req.params.id*1;
    const productIndex=products.findIndex(p=>p.id===productId)
     
    if(!productIndex ){
        const error = new Error("ID not found");
        error.statusCode = 404;
        next(error);
    }

  
    const deletedProduct = products.splice(productIndex, 1)[0];

   
    return successresponse(res, "Product deleted successfully", deletedProduct, 200);
}

exports.updatePartialProduct=(req,res, next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
         const error = new Error("ID not found");
        error.statusCode = 404;
        next(error);

    }   

    const {name , price, category , stocks}=req.body
        if(name!=undefined) product.name=name;
        if(price!=undefined)product.price=price;
        if(category!=undefined)product.category=category;
        if(stocks!=undefined)product.stocks=stocks;
    
      return successresponse(res, "Product updated successfully", product, 200);
}
