const products=require("../data/products")
exports.getAllProducts=(req,res)=>{
    res.json(products);
}
exports.getProductById=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId);
    if(!product)
    {
        return res.status(404).json({
           
            error:`not found this ${productId} in product list`
        });
    }
    res.json(product);
};
exports.createProduct=(req,res)=>{
    const {name,price,category,stock}=req.body;
    const newproduct={
        id:products.length+101,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
   products.push(newproduct)
   res.status(201).json({
    message:"product added successfully"
   })
}

exports.updateProduct=(req,res)=>{
    const productId=req.params.id*1;
    const product=products.find(p=>p.id===productId)
    if(!product)
    {
        return res.status(404).json({
            message:"not found"
        })
    }
    const {name,price,category,stock}=req.body;
    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;
    res.status(200).json(product)
}

exports.partialUpdateProduct = (req, res) => {
    const productId = req.params.id * 1;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "not found"
        });
    }

    const { name, price, category, stock } = req.body;

    if ("name" in req.body) product.name = name;
    if ("price" in req.body) product.price = price;
    if ("category" in req.body) product.category = category;
    if ("stock" in req.body) product.stock = stock;

    res.json(product);
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.id * 1;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "product not found"
        });
    }

    products = products.filter(p => p.id !== productId);

    res.status(200).json({
        message: "product deleted successfully"
    });
};