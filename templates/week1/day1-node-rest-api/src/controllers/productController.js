// const Product = require("../models/product.mongo");
// const AppError = require("../utils/AppError");
// const { successResponse } = require("../utils/apiResponse");


// // GET all products
// exports.getAllProducts = async (req, res, next) => {
//     try {
//         const products = await Product.find();
//         let time = new Date();

//         return successResponse(
//             res,
//             `All products fetched successfully at ${time}`,
//             products
//         );
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to fetch products", 500));
//     }
// };


// // GET product by ID
// exports.getProductById = async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         if (!product) {
//             return next(new AppError("Product not found", 404));
//         }

//         return successResponse(res, "Product fetched successfully", product);
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to fetch product", 500));
//     }
// };


// // CREATE product
// exports.createProduct = async (req, res, next) => {
//     try {
//         const { name, price, category, stock } = req.body;

//         const newProduct = await Product.create({
//             name,
//             price,
//             category,
//             stock
//         });

//         return successResponse(res, "Product created successfully", newProduct);
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to create product", 500));
//     }
// };


// // UPDATE product (PUT)
// exports.updateProduct = async (req, res, next) => {
//     try {
//         const { name, price, category, stock } = req.body;

//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             { name, price, category, stock },
//             { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//             return next(new AppError("Product not found", 404));
//         }

//         return successResponse(res, "Product updated successfully", updatedProduct);
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to update product", 500));
//     }
// };


// // PATCH (partial update)
// exports.partialUpdateProduct = async (req, res, next) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//             return next(new AppError("Product not found", 404));
//         }

//         return successResponse(res, "Product updated partially", updatedProduct);
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to patch product", 500));
//     }
// };


// // DELETE product
// exports.deleteProduct = async (req, res, next) => {
//     try {
//         const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//         if (!deletedProduct) {
//             return next(new AppError("Product not found", 404));
//         }

//         return successResponse(res, "Product deleted successfully", deletedProduct);
//     } catch (error) {
//         return next(new AppError(error.message || "Failed to delete product", 500));
//     }
// };




const productService = require("../services/productService");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");


// GET all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();

        let time = new Date();

        return successResponse(
            res,
            `All products fetched successfully at ${time}`,
            products
        );
    } catch (error) {
        return next(new AppError(error.message || "Failed to fetch products", 500));
    }
};


// GET product by ID
exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product fetched successfully", product);
    } catch (error) {
        return next(new AppError(error.message || "Invalid product ID", 400));
    }
};


// CREATE product
exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        const newProduct = await productService.createProduct({
            name,
            price,
            category,
            stock
        });

        return successResponse(res, "Product created successfully", newProduct, 201);
    } catch (error) {
        console.log(error)
        return next(new AppError(error.message || "Failed to create product", 500));
    }
};


// UPDATE product (PUT)
exports.updateProduct = async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        const updatedProduct = await productService.updateProduct(
            req.params.id,
            { name, price, category, stock }
        );

        if (!updatedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product updated successfully", updatedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to update product", 500));
    }
};


// PATCH (partial update)  ✅ (kept your original name)
exports.partialUpdateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.patchProduct(
            req.params.id,
            req.body
        );

        if (!updatedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product updated partially", updatedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to patch product", 500));
    }
};


// DELETE product
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);

        if (!deletedProduct) {
            return next(new AppError("Product not found", 404));
        }

        return successResponse(res, "Product deleted successfully", deletedProduct);
    } catch (error) {
        return next(new AppError(error.message || "Failed to delete product", 500));
    }
};