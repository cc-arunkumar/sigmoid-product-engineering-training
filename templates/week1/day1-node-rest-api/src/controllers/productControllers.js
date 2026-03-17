const products = require("../data/products");

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};  
exports.createProduct = (req, res) => {
    const { name, price, category, stock } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        category,
        stock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};
exports.updateProduct = (req, res) => {
    const productId = req.params.id * 1;
    const { name, price, category, stock } = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
        product.name = name;
        product.price = price;
        product.category = category;
        product.stock = stock;
        res.status(201).json(product);
    } else {
        res.status(404).json({ message: "Product not Found" });
    }
}; 