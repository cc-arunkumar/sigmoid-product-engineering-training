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

exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, category, stocks } = req.body;
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
        foundProduct.name = name || foundProduct.name;
        foundProduct.price = price || foundProduct.price;
        foundProduct.category = category || foundProduct.category;
        foundProduct.stocks = stocks || foundProduct.stocks;
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: "Product deleted" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

exports.updatePartialProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
        Object.assign(foundProduct, req.body);
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};