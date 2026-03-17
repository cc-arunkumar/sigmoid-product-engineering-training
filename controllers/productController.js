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