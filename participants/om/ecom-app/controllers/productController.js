let products = require('../data/products');

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const productId = (req.params.id)*1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
};

exports.createProduct = (req, res) => {
    const { name, price, category, stock } = req.body;

    const newProduct = {
        id: products.length + 101,
        name: name,
        price: price,
        category: category,
        stock: stock
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const productId = (req.params.id)*1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({ message: "Product not found!" });
    }

    const { name, price, category, stock } = req.body;
    
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    res.status(200).json(product);
};

exports.updatePartialProduct = (req, res) => {
    const productId = (req.params.id)*1;
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({ message: "Product not found!" });
    }

    const { name, price, category, stock } = req.body;
    
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    res.status(200).json(product);
};

exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({ message: "Product not found!" });
    }

    let newProducts = products.filter(p => p.id !== productId);
    products = newProducts;

    res.status(200).json({ message: "Product deleted successfully!" });
};
