const products = require("../data/products")
const {successResponse} = require("../utils/apiResponse")

exports.getAllProducts = (req,res) => {
    successResponse(res, products, "Products retrieved successfully");
}

exports.getProductById = (req,res,next) => {
    const productId = parseInt(req.params.id)
    const product = products.find(p => p.id === productId)

    if(!product){
        const error = new Error("Product ID not found");
        error.statusCode = 404;
        next(error);
    }
    successResponse(res, product, "Product retrieved successfully");
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

    successResponse(res, newProduct, "Product created successfully", 201);
}

exports.updateProduct = (req,res,next) => {
    const productId = req.params.id * 1;
    const product = products.find( p => p.id === productId)

    if(!product){
        const error = new Error("Product ID not found");
        error.statusCode = 404;
        next(error);
    }

    const {name,price,category,stock} = req.body;

    product.name = name;
    product.category = category;
    product.price = price;
    product.stock = stock;

    successResponse(res, product, "Product updated successfully");
}

exports.deleteProduct = (req, res,next) => {
  const productId = req.params.id * 1;
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found"
    });
  }

  products.splice(index, 1);

  successResponse(res, null, "Product deleted successfully", 204);
};

exports.updatePartialProduct = (req,res,next) => {
    const productId = Number(req.params.id)
    const product = products.find(p => p.id === productId)

    if(!product){
        const error = new Error("Product ID not found");
        error.statusCode = 404;
        next(error);
    }
    const {name,price,category,stock} = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;

    successResponse(res, product, "Product updated successfully");
}