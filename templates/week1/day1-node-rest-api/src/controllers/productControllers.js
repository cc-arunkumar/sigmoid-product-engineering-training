const products = require("../data/products");

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(400).json({
            message: "Product not found"
        })
    }
    res.json(product);
}

exports.createProduct = (req, res) => {
    const { name, price, category, stock } = req.body;

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        stock: stock
    }

    products.push(newProduct);
    res.status(201).json(newProduct);
}

exports.modifyProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, category, stock } = req.body;

    const product = products.find(p => p.id === productId)

    if (!product) {
        return res.status(404).json({
            message: "Product Id not found"
        })
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    res.status(200).json(product);
}

exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product Id not found"
        })
    }

    products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product Deleted"
    });
}

exports.patchProduct = (req, res) => {
    const { id, name, price, category, stock } = req.body;

    const product = products.find(p => p.id === parseInt(id))

    if (!product) {
        return res.status(404).json({
            message: "Product Id not found"
        })
    }

    if (name != undefined)
        product.name = name;
    if (price != undefined)
        product.price = price;
    if (category != undefined)
        product.category = category;
    if (stock != undefined)
        product.stock = stock;

    res.status(200).json(product);
}