const products = [];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

exports.createProduct = (req, res) => {
    const { name, price, category, stocks } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        category,
        stocks
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};