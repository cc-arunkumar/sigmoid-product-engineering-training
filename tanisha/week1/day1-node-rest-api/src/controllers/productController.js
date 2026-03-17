const products = require("../data/product");
exports.getAllProducts = (req,res)=>{
    res.json(products);
};
exports.getProductsById = (req,res)=>{
    const productID=parseInt(req.params.id);
    const product=products.find(p=>p.id===productID);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    res.json(product);
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
    res.status(201).json(newProduct)
}
//put
exports.updateProduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    const{name,price,category,stock}=req.body;
    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;
    res.status(200).json(product);
}