 const products=require("../data/products")
 exports.getAllProducts=(req,res)=>{
    res.json(products);
 };
exports.getProductById=(req,res,next)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    res.json(product);
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
    res.status(201).json(newProduct);
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

    res.status(200).json(product);

 }
 exports.deleteProduct=(req,res)=>{
    const productId=req.params.id*1;
    const product=products.find(p=>p.id===productId);
    if(!product){
        const error=new Error();
        next(error);
    }
    products.splice(product,1);

    res.status(200).json({
        message:"Product deleted successfully"
    });

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
    res.status(200).json(product);

}