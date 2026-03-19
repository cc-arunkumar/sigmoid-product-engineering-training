const Product = require("../models/productmodel");
exports.createProductMongo = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return successResponse(res, { product });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
//now using the classess appError and AppResponse instead of Apiresponse 
//const {successResponse,errorResponse} = require("../utils/apiResponse")
const AppResponse=require("../utils/AppResponse")
const AppError=require("../utils/AppError")
//defautl==lt exports
exports.getAllProducts = async (req, res,next) => {
  //without success response
  // res.json(products);
  //with success response
  //now wrapped success response in try catch block to account for internal server errors,server crashes and internet crashes due to which even if api should succeed it fails 
  try{
    const products=await Product.find()
  //return successResponse(res, "Products fetched successfully", products);
  return new AppResponse({ data: products }).send(res);
  }catch(error){
    // return next({
    //         status:500,
    //         message:"Failed to fetch products"
    //     })
    return next(new AppError("Failed to fetch products", 500));
  }
};
exports.getProductById = async (req, res,next) => {
  //const productId=parseInt(req.params.id)
  //parseInt however has a drawbakc convert "100a" into 100 which is incorrect so use the Number method instead
  try{
  // const productId = Number(req.params.id);
  // console.log(productId);
  // const product = products.find((product) => {
  //   return product.id === productId;
  // }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  const product = await Product.findById(req.params.id);
  if (!product) {
    //without error response

    // return res.status(404).json({
    //   message: "Product not found",
    // });

    //with error response
    //return errorResponse(res, "Product not found", 404)

    return next(new AppError("Product not found", 404));
  }
    //we could do
    //return res.status(404).send({
    //         message:"Product not found"
    // })
//without success response
  // res.json(product);
  //with success response
  else{
  //return successResponse(res, "Product fetched successfully", product);

  return new AppResponse({ data: product }).send(res);
  }}catch(error){
//  return next({
//             status:500,
//             message:"Failed to fetch product"
//         })

return next(new AppError("Failed to fetch product", 500));
}
};
exports.createProduct = async (req, res,next) => {
  try{
  const { name, price, category, stock } = req.body;
  // const newProduct = {
  //   id: products.length + 1,
  //   name: name,
  //   price: price,
  //   category: category,
  //   stock: stock,
  // };
  // products.push(newProduct);
  const product = await Product.create({name,price,category,stock});
  //without success response
  // res.status(201).json(newProduct);
  //with success response
  //return successResponse(res, "Product created successfully", newProduct, 201);
  return new AppResponse({
            statusCode: 201,
            data: product,
            message: "Product created successfully"
        }).send(res);
}catch(error){
// return next({
//             status:500,
//             message:"Failed to create product"
//         })
return next(new AppError("Failed to create product", 500));
}
}
exports.updateProduct = async (req, res,next) => {
  try{
  // const productId = req.params.id;
  // console.log(productId);
  // const product = products.find((product) => {
  //   return product.id === productId;
  // }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  // //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  // //
  // if (!product) {
  //   //without error response
  //   // return res.status(404).json({
  //   //   message: "Product not found",
  //   // });
  //   //with error response
  //   //return errorResponse(res, "Product not found", 404)
  //   return next(new AppError("Product not found", 404));
  // }
  const { name, price, category, stock } = req.body;
  // product.name = name;
  // product.price = price;
  // product.category = category;
  // product.stock = stock;
  const product = await Product.findByIdAndUpdate(req.params.id,{ name, price, category, stock },{ new: true, runValidators: true });
//without success response
  // return res.status(200).send("succesful update done ");
  //with success response
  //return successResponse(res, "Product updated successfully", product);
  return new AppResponse({ data: product }).send(res);
}catch(error){
  // return next({
  //           status:500,
  //           message:"Failed to update product"
  //       })
  return next(new AppError("Failed to update product", 500));
}
}
exports.updatePartialProduct = async (req, res,next) => {
  try{
  // const productId = Number(req.params.id);
  // console.log(productId);
  // const product = products.find((product) => {
  //   return product.id === productId;
  // }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  //
  const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true });
  if (!product) {
    //without error response 

    // return res.status(404).json({
    //   message: "Product not found",
    // });

    //with error response 
    //return errorResponse(res, "Product not found", 404)
    return next(new AppError("[Product not found", 404));
  }
  // let reqobj = req.body;
  // let attributestoupdate = Object.keys(reqobj);
  // console.log(attributestoupdate)
  // for (let key of attributestoupdate) {
  //   product[key] =reqobj[key];
  // }
  // console.log(product)
  //without success response
  //return res.status(200).send("succesful partial update done ");
  //with success response
  //return successResponse(res, "Product Partially  updated successfully", product);
  return new AppResponse({ data: product }).send(res);
}catch(error){
  // return next({
  //           status:500,
  //           message:"Failed to partaly update product"
  //       })
  return next(new AppError("Failed to delete product", 500));
}
};
exports.deleteProduct = async (req, res,next) => {
  try{
  // const productId = Number(req.params.id);
  // console.log(productId);
  // const product = products.find((product) => {
  //   return product.id === productId;
  // });
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    //without error response
    // return res.status(404).json({
    //   message: "Product not found",
    // });
    //with error response
    //return errorResponse(res,"Product not found",404)
    return next(new AppError("Product not found", 404));
  }
  // const remproducts=products.filter((product)=>product.id!=productId)
  // products=remproducts
  // const index = products.indexOf(product);
  // products.splice(index, 1);
  //without success response
  //res.status(200).send("deleted succesfully");
  //with success response
  //return successResponse(res, "Deleted successfully", null);
  return new AppResponse({ data: null, message: "Product deleted successfully" }).send(res);
}catch(error){
  // return next({
  //           status:500,
  //           message:"Failed to create product"
  //       })
  return next(new AppError("Failed to delete product", 500));
}
};