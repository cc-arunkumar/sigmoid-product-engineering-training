const products = require("../data/Products");

//GET ALL
exports.getAllProducts=(req,res)=>{
    res.json(products);// getting from data->Products.js conversion in  controller 
};//get back to routes

// GET product by ID - with testing of error handler 
exports.getProductById = (req, res, next) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    //  If product not found → send error
    if (!product) {
        const error = new Error("Product not found");
        //error.statusCode = 404; //when commented the 500 code will be shown as in error handler 
        return next(error);   //  goes to error handler
    }

    // If found
    return res.status(200).json(product);
};

//POST
exports.createProduct = (req,res) => {
    const {name,price,category,stock} = req.body; //from req body read all attributes present in code 

    //creating new product with the values
    const newProduct = {
        id:products.length+1,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
    products.push(newProduct);
    return res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    })
}

//PUT
exports.updateProduct = (req,res) => {
    const productID = req.params.id * 1; //with id like 101s params will take as int now after multiplication it will be 101s
    const product = products.find(p => p.id === productID);

    //if not product
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    const {name,price,category,stock} = req.body;

    product.name=name;
    product.price=price;
    product.category=category;
    product.stock=stock;

    res.status(200).json(product)
};

//DELETE
exports.deleteProduct = (req,res) =>{
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message: "Product not found"
        });
    }
    products.pop(product);
    return res.status(201).json({
        message: "Product deleted successfully"
    })
}

//PATCH - updatepartialproduct
exports.updatePartialProduct = (req,res) => {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "Product not found"
        });
    }

    const{name,price,category,stock} = req.body;

    if(name != undefined){
        product.name = name;
    }
    if(price != undefined){
        product.price = price;
    }
    if(category != undefined){
        product.category = category;
    }
    if(stock != undefined){
        product.stock = stock;
    }
    res.status(200).json(products);
};