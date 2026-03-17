const products = require('../data/product');

exports.getAllProducts = (req, res) => {
    res.json(products);
}

exports.getProductById = (req, res) => {

    // Extract the product ID from the request parameters parsed as an integer using parseInt. This is necessary because route parameters are typically strings, and we need to compare it with the numeric ID of the products in our data.
    const productId = parseInt(req.params.id);
// Find the product with the matching ID p is the current product in the iteration, and p.id is the ID of that product. The find method will return the first product that matches the condition (p.id === productId) or undefined if no such product is found.
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    }
    // If the product is found, we send it back in the response as JSON using res.json(product). This will allow the client to receive the details of the requested product.

        res.json(product);
    }

    exports.createProduct = (req, res) => {
        // Extract the name and price from the request body using destructuring assignment. This allows us to easily access the name and price values sent by the client in the POST request.
        const { id, name, price } = req.body;

        const newProduct = {
        id: products.length + 101, // Generate a new ID based on the length of the products array
        name : name,
        price : price
        };

        products.push(newProduct);

        res.status(201).json(newProduct);
    }

     exports.updateProduct = (req,res) => {
        const productId = parseInt(req.params.id);

        const product = products.find(p => p.id === productId);
        if(!product){
           return res.status(404).json({message : "Product not found"});
            
        }
        const  {name,price} = req.body;

        product.name=name;
        product.price=price;

        res.status(201).json(product)

    }

    //now to delete we will write a new function in the controller and then we will create a new route for that in the routes file and then we will test it using postman.
    exports.deleteProduct =(req,res) =>{
        const productId = parseInt(req.params.id);

        const product = products.find(p => p.id === productId);
        if(!product){
           return res.status(404).json({message : "Product not found"});
        }
   // The indexOf method is used to find the index of the product in the products array. If the product is found, it returns the index; otherwise, it returns -1. The splice method is then used to remove the product from the array at the specified index.
        const index = products.indexOf(product);
        products.splice(index,1);

        res.status(200).json({message : "Product deleted successfully"});
    }


    exports.patchProduct = (req, res) => {
        const productId = parseInt(req.params.id);

        const product = products.find(p => p.id === productId);
        if(!product){
           return res.status(404).json({message : "Product not found"});

        }
        const  {name,price} = req.body;

        if(name!==undefined){
            product.name=name;
        }
        if(price!==undefined){
            product.price=price;
        }

       return res.status(201).json(product);

    }
