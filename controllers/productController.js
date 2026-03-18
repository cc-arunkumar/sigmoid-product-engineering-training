const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/appError")

// GET all products
exports.getAllProducts = (req, res, next) => {
  try {
    return successResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found"
      });
    }

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// CREATE product (POST)
exports.createProduct = (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      category,
      stock
    };

    products.push(newProduct);

    return successResponse(res, "Product created successfully", newProduct);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
      return next({
        statusCode: 404,
        message: "Product not found"
      });
    }

    const { name, price, category, stock } = req.body;

    products[index] = {
      id: productId,
      name,
      price,
      category,
      stock
    };

    return successResponse(res, "Product updated successfully", products[index]);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// PATCH
exports.updatePartialProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found"
      });
    }

    Object.assign(product, req.body);

    return successResponse(res, "Product updated partially", product);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// DELETE
exports.deleteProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
      return next({
        statusCode: 404,
        message: "Product not found"
      });
    }

    const deleted = products.splice(index, 1);

    return successResponse(res, "Product deleted successfully", deleted);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// const products = require("../data/products");

// exports.getAllProducts = (req, res) => {
//     res.json(products);
// };

// exports.getProductById = (req, res) => {
//     const productId = parseInt(req.params.id)
//     const product = products.find(p => p.id === productId)

//     if(!product){
//         return res.status(404).json({
//             message: "The product is not found"
//         });
//     }
//     res.json(product);
// }

// exports.createProduct = (req, res) => {
//     const {id, name, price, category, stock} = req.body;

//     const newProduct = {
//         id,
//         name,
//         price,
//         category,
//         stock
//     };

//     products.push(newProduct);

//     return res.status(201).json(newProduct);
// };

// exports.updateProduct = (req, res) => {
//     const productId = req.params.id * 1
//     const product = products.find(p => p.id === productId)
    
//     if(!product){
//         return res.status(404).json({
//             message: "The product is not found"
//         });
//     }
//     const{name, price, category, stock} = req.body;

//     product.name = name;
//     product.price = price;
//     product.category = category;
//     product.stock = stock;
    
//     return res.status(200).json(product);
// }

// exports.updatePartialProduct = (req, res) => {
//     const productId = req.params.id * 1
//     const product = products.find(p => p.id === productId)
    
//     if(!product){
//         return res.status(404).json({
//             message: "The product is not found"
//         });
//     }
//     const{name, price, category, stock} = req.body;

//     if(name != undefined){
//         product.name = name;
//     }
//     if(price != undefined){
//         product.price = price;
//     }
//     if(category != undefined){
//         product.category = category;
//     }
//     if(stock != undefined){
//         product.stock = stock;
//     }
    
//     return res.status(200).json(product);
// }

// exports.deleteProduct = (req, res) => {
//     const productId = req.params.id * 1
//     console.log("id - ",productId)
//     const product = products.find(p => p.id === productId)
//     console.log("Product - ",product)

//     if(!product){
//         return res.status(404).json({
//             message: "The product is not found"
//         });
//     }
//     const index = products.indexOf(product)
//     products.splice(index, 1)
//     res.status(200).json({
//         message:"This record was deleted"
//     })
// }
