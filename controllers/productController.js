const products=require("../data/products");

exports.getAllProducts=(req,res)=>{
    res.json(products);
};

exports.getProductById=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);

    if(!product){
        return res.status(400).json({
            message:"Product not found"
        })
    }
    res.json(product);
};

exports.postProduct=(req,res)=>{
    const {name,price}=req.body;
    const newProduct={
        id:products.length+1,
        name:name,
        price:price
    }
    products.push(newProduct);
    return res.status(201).json(newProduct);
}

exports.updateProduct=(req,res)=>{
    const {id, name, price}=req.body;
    const product=products.find(p=>p.id===id);
    product.name=name;
    product.price=price;
    return res.status(200).json(product);
}

exports.deleteProduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const productIndex=products.findIndex(p=>p.id===productId);
    if (productIndex===-1){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    products.splice(productIndex,1);
    return res.status(200).json({
        message:"Product deleted"
    });
};