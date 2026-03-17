let products = require("../data/products");

exports.getAllProducts = (req,res) => {
    res.json(products);
};

exports.getProductById = (req,res) => {
    const productId = parseInt(req.params.id);      // in request params are all the parameters from there select on eparameter id
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({
            message : "Not Found!"
        });
    }
    res.json(product);
};


exports.createProduct = (req,res) => {
    const { name, price, category, stock } = req.body;

    const product = {
        id :  100 + products.length + 1,
        name : name,
        category : category,
        price : price,
        stock : stock
    }

    products.push(product);

    res.status(201).json(product)
};
