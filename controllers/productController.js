// const products = require("../data/products");
// // get all prouduct
// exports.getAllProducts = (req, res) => {
//     res.json(products);
// };

// // get product by id
// exports.getProductById = (req, res) =>{
//   const productId = parseInt(req.params.id);
//     const findProduct = products.find(p => p.id === productId);

//     if(!findProduct){
//        return res.status(404).json({
//         message : " product  not found"
//        })
//     }
//     res.json(findProduct);
// }

// // create new product
//  exports.createProduct = (req ,res ,next)=>{
//    const {id , name , price , category , stock , brand} = req.body;

//    const newProduct = {
//     id : id,
//     name : name,
//     price : price,
//     category : category,
//     stock : stock,
//     brand : brand
//    }
//    products.push(newProduct);
//    res.status(201).json(newProduct);
//  }

//  // update product
 
//  exports.updateProduct = (req , res , next) =>{
//   const productId = parseInt(req.params.id);
//   const findProduct = products.find(p => p.id === productId);

//   if(!findProduct){
//     return res.status(404).json({
//       message: "Product not found"
//     })
//   }
//   const {id , name , price , category , stock , brand} = req.body;

//   findProduct.id = id,
//   findProduct.name = name,
//   findProduct.price = price,
//   findProduct.category = category,
//   findProduct.stock = stock,
//   findProduct.brand = brand

//   res.json(findProduct);
//  }
// // delete product
// exports.deleteProduct = (req , res , next) =>{
//   const productId = parseInt(req.params.id);

//   const findProductIndex = products.findIndex(p => p.id === productId);

//   if(findProductIndex == -1){
//     return res.status(404).json({
//       message: "Product not found"
//     })
//   } 
//   products.splice(findProductIndex,1);

//   res.json({
//     message: "Product deleted successfully"
//   })
//   }

// // patch product
// exports.patchProduct = (req, res, next) => {
//   const productId = parseInt(req.params.id);
//   const findProduct = products.find(p => p.id === productId);

//   if (!findProduct) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   Object.assign(findProduct, req.body);
//   res.json(findProduct);
// };


const products = require("../data/products");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// GET all products
exports.getAllProducts = (req, res, next) => {
  try {
    return successResponse(res, "All products fetched successfully", products);
  } 
  catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
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
      return next(new AppError( " products not found", 404));
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
exports.patchProduct = (req, res, next) => {
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
      return next(new AppError(error.message || "Failed to fetch products", 404));
    }

    const deleted = products.splice(index, 1);

    return successResponse(res, "Product deleted successfully", deleted);
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch products", 500));
  }
};



