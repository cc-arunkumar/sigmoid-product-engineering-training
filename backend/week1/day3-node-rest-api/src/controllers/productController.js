const { products } = require("../data/products");
const { successResponse } = require("../utils/apiResponse");

// GET all products
exports.getAllProducts = (req, res, next) => {
  try {
    return successResponse(res, "All products fetched successfully", products);
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to fetch products",
    });
  }
};

// GET product by ID
exports.getProductById = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to fetch product",
    });
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
      stock,
    };

    products.push(newProduct);

    return successResponse(res, "Product created successfully", newProduct);
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to create product",
    });
  }
};

// UPDATE product (PUT)
exports.updateProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    const { name, price, category, stock } = req.body;

    products[index] = {
      id: productId,
      name,
      price,
      category,
      stock,
    };
    return successResponse(
      res,
      "Product updated successfully",
      products[index],
    );
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to update product",
    });
  }
};

// PATCH
exports.patchProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    Object.assign(product, req.body);

    return successResponse(res, "Product updated partially", product);
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to patch product",
    });
  }
};

// DELETE
exports.deleteProduct = (req, res, next) => {
  try {
    const productId = req.params.id * 1;
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      return next({
        statusCode: 404,
        message: "Product not found",
      });
    }

    const deleted = products.splice(index, 1);

    return successResponse(res, "Product deleted successfully", deleted);
  } catch (error) {
    return next({
      statusCode: 500,
      message: error.message || "Failed to delete product",
    });
  }
};

// let { products } = require("../data/products");

// exports.getAllproducts = (req, res) => {
//   res.json({
//     data: products,
//   });
// };

// exports.getProductsById = (req, res, next) => {
//   const id = req.params.productId * 1;
//   const product = products.find((ele) => ele.id === id);
//   if (!product) {
//     const error = new Error("Invalid product Id!");
//     error.statusCode = 400;
//     return next(error);
//   }
//   res.status(201).json(product);
// };

// exports.createPost = (req, res) => {
//   const { name, price, stock, category } = req.body;

//   const newProduct = {
//     id: products.length + 1,
//     name,
//     price,
//     category,
//     stock,
//   };
//   products.push(newProduct);

//   res.status(201).json({
//     message: "New product added",
//     data: newProduct,
//   });
// };

// exports.editPost = (req, res) => {
//   const id = req.params.productId * 1;

//   let pr = products.find((ele) => ele.id === id);

//   Object.keys(req.body).forEach((key) => {
//     pr[key] = req.body[key];
//   });

//   res.status(201).json({
//     message: "product edited successfully",
//     data: pr,
//   });
// };

// exports.updatePost = (req, res) => {
//   const id = req.params.productId * 1;
//   const { name, price, stock, category } = req.body;

//   let pr = products.find((ele) => ele.id === id);

//   pr.name = name;
//   pr.price = price;
//   pr.stock = stock;
//   pr.category = category;

//   res.status(201).json({
//     message: "product updated successfully",
//     data: pr,
//   });
// };

// exports.deletePost = (req, res) => {
//   const id = req.params.productId * 1;

//   products = products.filter((ele) => ele.id !== id);
//   res.status(201).json({
//     message: "product deleted successfully",
//   });
// };
