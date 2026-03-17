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
