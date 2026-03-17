const products=require("../data/products");
const successResponse=require("../utils/apiResponse")
const errorResponse=require("../utils/apiResponse")
exports.getAllProducts=(req,res)=>{
    // res.json(products);
    successResponse(res,products)
};
exports.getProductById=(req, res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=> p.id===productId);

    if(!product){
        return res.status(400).json({
            message:"Product not found"
        });
    }
    res.json(product);
};
exports.createProduct=(req,res)=>{
    const{name, price,category,stock}=req.body

    const product={
        id: products.length +101,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
    products.push(product)
    res.status(201).json(product)
};
exports.updateproduct=(req,res)=>{
    const productId=req.params.id * 1;
    const{name, price,category,stock}=req.body;

    const product=products.find(p=> p.id===productId);
    if(!product){
        return res.status(400).json({
        message:"Product not found"
        });
    }

    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;
    res.status(200).json(product)
};
exports.deleteproduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const productIndex=products.find(p=> p.id===productId);

    if(!productIndex){
        return res.status(400).json({
        message:"Product not found"
        });
    }
    products.splice(productIndex,1);
    res.status(200).json("product deleted")
};
exports.updatePartialProduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=> p.id===productId);
     
    if(!product){
        return res.status(400).json({
        message:"Product not found"
        });
    }
    const{name, price,category,stock}=req.body;
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

}