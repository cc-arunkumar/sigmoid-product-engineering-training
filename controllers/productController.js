const products = require("../data/products");

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id)
    const product = products.find(p => p.id === productId)

    if(!product){
        return res.status(404).json({
            message: "The product is not found"
        });
    }
    res.json(product);
}

exports.createProduct = (req, res) => {
    const {id, name, price, category, stock} = req.body;

    const newProduct = {
        id,
        name,
        price,
        category,
        stock
    };

    products.push(newProduct);

    return res.status(201).json(newProduct);
};
