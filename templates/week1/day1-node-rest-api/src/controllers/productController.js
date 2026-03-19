// const products = require("../data/Products");
// const { successResponse } = require("../utils/response");

// //GET ALL
// exports.getAllProducts=(req,res)=>{
//     res.json(products);// getting from data->Products.js conversion in  controller 
// };//get back to routes

// // GET product by ID - with testing of error handler 
// exports.getProductById = (req, res, next) => {

//     const id = parseInt(req.params.id);

//     const product = products.find(p => p.id === id);

//     //  If product not found → send error
//     if (!product) {
//         const error = new Error("Product not found");
//         //error.statusCode = 404; //when commented the 500 code will be shown as in error handler 
//         return next(error);   //  goes to error handler
//     }

//     // If found
//     return successResponse(res, "Product fetched successfully", product);//using the apiResponse utils
// };

// //POST
// exports.createProduct = (req,res) => {
//     const {name,price,category,stock} = req.body; //from req body read all attributes present in code 

//     //creating new product with the values
//     const newProduct = {
//         id:products.length+1,
//         name:name,
//         price:price,
//         category:category,
//         stock:stock
//     }
//     products.push(newProduct);
//     return res.status(201).json({
//         message: "Product created successfully",
//         product: newProduct
//     })
// }

// //PUT
// exports.updateProduct = (req,res) => {
//     const productID = req.params.id * 1; //with id like 101s params will take as int now after multiplication it will be 101s
//     const product = products.find(p => p.id === productID);

//     //if not product
//     if(!product){
//         return res.status(404).json({
//             message:"Product not found"
//         });
//     }
//     const {name,price,category,stock} = req.body;

//     product.name=name;
//     product.price=price;
//     product.category=category;
//     product.stock=stock;

//     res.status(200).json(product)
// };

// //DELETE
// exports.deleteProduct = (req,res) =>{
//     const productId = req.params.id * 1;
//     const product = products.find(p => p.id === productId);

//     if(!product){
//         return res.status(404).json({
//             message: "Product not found"
//         });
//     }
//     products.pop(product);
//     return res.status(201).json({
//         message: "Product deleted successfully"
//     })
// }

// //PATCH - updatepartialproduct
// exports.updatePartialProduct = (req,res) => {
//     const productId = req.params.id * 1;
//     const product = products.find(p => p.id === productId);

//     if(!product){
//         return res.status(404).json({
//             message : "Product not found"
//         });
//     }

//     const{name,price,category,stock} = req.body;

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
//     res.status(200).json(products);
// };


const Product = require("../models/product.mongo");
const { successResponse } = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

// GET all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return successResponse(
      res,
      "All products fetched successfully",
      products
    );
  } catch (error) {
    return next(
      new AppError(
        error.message || "Failed to fetch products",
        500
      )
    );
  }
};

// GET product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product fetched successfully",
      product
    );
  } catch (error) {
    return next(new AppError("Invalid product ID", 400));
  }
};

// CREATE product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      stock,
    });

    return successResponse(
      res,
      "Product created successfully",
      product
    );
  } catch (error) {
    return next(
      new AppError(
        error.message || "Failed to create product",
        500
      )
    );
  }
};

// UPDATE product (PUT - full update)
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product updated successfully",
      product
    );
  } catch (error) {
    return next(
      new AppError(
        error.message || "Failed to update product",
        500
      )
    );
  }
};

// PATCH product (partial update)
exports.patchProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product updated partially",
      product
    );
  } catch (error) {
    return next(
      new AppError(
        error.message || "Failed to patch product",
        500
      )
    );
  }
};

// DELETE product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(
      res,
      "Product deleted successfully",
      product
    );
  } catch (error) {
    return next(
      new AppError(
        error.message || "Failed to delete product",
        500
      )
    );
  }
};