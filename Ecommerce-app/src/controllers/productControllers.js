const products = require("../data/products")

exports.getAllProducts = (req,res) => {
    res.json(products);
}

exports.getProductById = (req,res,next) => {
    const productId = parseInt(req.params.id)
    const product = products.find(p => p.id === productId)

    if(!product){
        const error = new Error("Product ID not found");
        error.statusCode = 404;
        next(error);
    }
    res.json(product);
}

exports.createProduct = (req,res) => {
    const {name,price,category,stock} = req.body;
    const newProduct = {
        id : 100 + products.length + 1,
        name : name,
        price : price,
        category : category,
        stock : stock
    }

    products.push(newProduct);

    res.status(201).json(newProduct)
}

exports.updateProduct = (req,res) => {
    const productId = req.params.id * 1;
    const product = products.find( p => p.id === productId)

    if(!product){
        return res.status(404).json({
            message : "product not found"
        })
    }

    const {name,price,category,stock} = req.body;

    product.name = name;
    product.category = category;
    product.price = price;
    product.stock = stock;

    res.status(200).json(product);
}

exports.deleteProduct = (req, res) => {
  const productId = req.params.id * 1;
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found"
    });
  }

  products.splice(index, 1);

  res.status(204).send();
};

exports.updatePartialProduct = (req,res) => {
    const productId = Number(req.params.id)
    const product = products.find(p => p.id === productId)

    if(!product){
        return res.status(404).json({
            message : "product not found"
        })
    }
    const {name,price,category,stock} = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    res.status(200).json(product)
}