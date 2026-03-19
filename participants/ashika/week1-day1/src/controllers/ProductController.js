// const products=require("../data/products");

// const {successresponse}=require("../utils/apiresponses");


// exports.getallproducts=(req, res)=>{
//     // res.json(products);

//     return successresponse(res, "Product displays", products, 200);
// } ;



// exports.getproductbyId=(req,res , next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);
//     }
//     return successresponse(res, "Product get by id ", products, 200);
// }

// exports.createproducts=(req,res)=>{
//     // const newProduct = { id:108, name:"tablet", price:40000 };

//     const {name , price, category , stocks}=req.body

//     const newProduct={
//         id:100+products.length+1,
//         name:name,
//         price:price,
//         category:category,
//         stocks:stocks
//     }

//     products.push(newProduct)

//    return successresponse(
//         res,
//         "Product created successfully",
//         newProduct,
//         201
//     );

// }


// exports.updateProduct=(req,res, next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);

//     }   

//     const {name , price, category , stocks}=req.body

//         product.name=name,
//         product.price=price,
//         product.category=category,
//         product.stocks=stocks

//      return successresponse(res, "Product updated successfully", product, 200);
// }


// exports.DeletebyId=(req,res, next)=>{
//     const productId=req.params.id*1;
//     const productIndex=products.findIndex(p=>p.id===productId)

//     if(!productIndex ){
//         const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);
//     }


//     const deletedProduct = products.splice(productIndex, 1)[0];


//     return successresponse(res, "Product deleted successfully", deletedProduct, 200);
// }

// exports.updatePartialProduct=(req,res, next)=>{
//     const productId=parseInt(req.params.id);
//     const product=products.find(p=>p.id===productId)

//     if(!product){
//          const error = new Error("ID not found");
//         error.statusCode = 404;
//         next(error);

//     }   

//     const {name , price, category , stocks}=req.body
//         if(name!=undefined) product.name=name;
//         if(price!=undefined)product.price=price;
//         if(category!=undefined)product.category=category;
//         if(stocks!=undefined)product.stocks=stocks;

//       return successresponse(res, "Product updated successfully", product, 200);
// }



// const products = require("../data/products");
const   Products = require("../models/product.mongo");

const { successResponse } = require("../utils/apiresponses");
const AppError = require("../utils/appError");


// GET all products

exports.getallproducts = async (req, res, next) => {
  let time=new Date();
    try {
        const products = await Products.find();
        return successResponse(res, `Product displays. ${time}`, products, 200);

    } catch (error) {

        return next( new AppError(error.message || "failed to fetch products" , 500));
    }

};


// GET product by ID

exports.getproductbyId = async(req, res, next) => {

    try {

        const productId = (req.params.id) * 1;

        const product = await Products.findById(req.params.id);


        if (!product) {

           return next( new AppError(error.message || "failed to fetch products" , 500));

        }


        return successResponse(res, "Product get by id ", product, 200);

    } catch (error) {

        return next({

            statusCode: 500,

            message: error.message || "Failed to fetch product"

        });

    }

};


// CREATE product (POST)

exports.createproducts =async (req, res, next) => {

    try {


        const newProduct = await Products.create(req.body);

        return successResponse(
        res,
        "Product created successfully",
    newProduct,
         201
    );

    } catch (error) {

       return next( new AppError(error.message || "failed to create products" , 500));

    }

};


// UPDATE product (PUT)

// exports.updateProduct = async(req, res, next) => {

//     try {

//         const productId = (req.params.id) * 1;

//         const index = products.findIndex(p => p.id === productId);


//         if (index === -1) {

//             return next({

//                 statusCode: 404,

//                 message: "Product not found"

//             });

//         }


//         const { name, price, category, stock } = req.body;


//         products[index] = {

//             id: productId,

//             name,

//             price,

//             category,

//             stock

//         };


//         return successResponse(res, "Product updated successfully", index, 200);

//     } catch (error) {

//       return next( new AppError(error.message || "failed to update products" , 500));

//     }

// };
// PUT /products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // returns the updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

// PATCH

// exports.updatePartialProduct = (req, res, next) => {

//     try {

//         const productId = (req.params.id) * 1;

//         const product = products.find(p => p.id === productId);


//         if (!product) {

//             return next({

//                 statusCode: 404,

//                 message: "Product not found"

//             });

//         }


//         Object.assign(product, req.body);


//         return successResponse(res, "Product updated successfully", product, 200);

//     } catch (error) {

//        return next( new AppError(error.message || "failed to patch products" , 500));

//     }

// };
exports.updatePartialProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find and update the product partially
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: req.body },          // only update fields present in req.body
      { new: true, runValidators: true } // return the updated document & run schema validations
    );

    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }

    return successResponse(res, "Product updated successfully", updatedProduct, 200);
  } catch (error) {
    return next(new AppError(error.message || "Failed to patch product", 500));
  }
};


// DELETE

exports.DeletebyId = async(req, res, next) => {

    try {

       const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }


        return successResponse(res, "Product deleted successfully", deletedProduct, 200);

    } catch (error) {

       return next( new AppError(error.message || "failed to delete products" , 500));

    }

};