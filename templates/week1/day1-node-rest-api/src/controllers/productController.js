const products = require("../data/Products");

//GET ALL
exports.getAllProducts=(req,res)=>{
    res.json(products);// getting from data->Products.js conversion in  controller 
};//get back to routes

//GET by ID
exports.getProductById=(req,res)=>{
   const productId=parseInt(req.params.id);//whatever written in URL is considered as String therefore change to int for matching 
   const product=products.find(p => p.id ===productId);//pid coming from products and productID from URL

   //if it doesnt match
   if(!product){
       return res.status(404).json({
           message:"Product not found"
       });
   }
   //if matches directly here
   res.json(product);
}

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
