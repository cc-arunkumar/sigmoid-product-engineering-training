let products = require ("../data/products");

exports.getAllProducts= (req, res)=>{
    res.json(products);
};

exports.getProductByID= (req,res)=>{
    const productID= parseInt(req.params.id);

    const  product = products.find( p => p.id=== productID);

    if(!product){
        return res.status(404).json({
            message : "Product not Found"
        });
    }
        res.json(product);
};

exports.createProduct= (req, res)=>{
    const {name,price,category,stock}= req.body;

    const newProduct={
        id: 100+products.length+1,
        name:name,
        price:price,
        category:category,
        stock:stock
    }

    products.push(newProduct);

    res.status(201).json(products);
}

exports.updateProduct= (req, res)=>{
    const productID = parseInt(req.params.id);

    const product= products.find(p => p.id===productID);

    if(!product){
        return res.status(404).json({
            message: "Product not Found"
        })
    }

    const {name,price,category,stock}= req.body;

    product.name = name;
    product.price= price;
    product.category=category;
    product.stock=stock;

    res.status(200).json(product);

}

exports.deleteProduct = (req, res) => {
    const productID = Number(req.params.id);

    const updatedProducts = products.filter(p => p.id !== productID);

    if (updatedProducts.length === products.length) {
        return res.status(404).json({
            message: "Product not Found"
        });
    }

    products = updatedProducts;

    res.status(200).json(products);
};


exports.updatePartialProduct = (req, res)=>{

    const productID = parseInt(req.params.id);

    const product = products.find(p => p.id=== productID);

    if(!product){
        return req.status(400).json({
            message:"data not found"
        })
    }

    const {name,price,category,stock}= req.body;

    if(name!= undefined) product.name=name;
    if(price!= undefined) product.price=price;
    if(category!= undefined) product.category=category;
    if(stock!= undefined) product.stock=stock;

    res.status(200).json(product);
}