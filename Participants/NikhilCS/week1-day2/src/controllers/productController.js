const products = require("../data/products");
const {successResponse,errorResponse} = require("../utils/apiResponse")
//defautl==lt exports
exports.getAllProducts = (req, res) => {
  //without success response
  // res.json(products);
  //with success response
  return successResponse(res, "Products fetched successfully", products);
};
exports.getProductById = (req, res) => {
  //const productId=parseInt(req.params.id)
  //parseInt however has a drawbakc convert "100a" into 100 which is incorrect so use the Number method instead
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  if (!product) {
    //without error response

    // return res.status(404).json({
    //   message: "Product not found",
    // });

    //with error response
    return errorResponse(res, "Product not found", 404)
  }
    //we could do
    //return res.status(404).send({
    //         message:"Product not found"
    // })
//without success response
  // res.json(product);
  //with success response
  return successResponse(res, "Product fetched successfully", product);
};
exports.createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
    category: category,
    stock: stock,
  };
  products.push(newProduct);
  //without success response
  // res.status(201).json(newProduct);
  //with success response
  return successResponse(res, "Product created successfully", newProduct, 201);
}
exports.updateProduct = (req, res) => {
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  //
  if (!product) {
    //without error response
    // return res.status(404).json({
    //   message: "Product not found",
    // });
    //with error response
    return errorResponse(res, "Product not found", 404)
  }
  const { name, price, category, stock } = req.body;
  product.name = name;
  product.price = price;
  product.category = category;
  product.stock = stock;
//without success response
  // return res.status(200).send("succesful update done ");
  //with success response
  return successResponse(res, "Product updated successfully", product);
}
exports.updatePartialProduct = (req, res) => {
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  //
  if (!product) {
    //without error response 

    // return res.status(404).json({
    //   message: "Product not found",
    // });

    //with error response 
    return errorResponse(res, "Product not found", 404)
  }
  let reqobj = req.body;
  let attributestoupdate = Object.keys(reqobj);
  console.log(attributestoupdate)
  for (let key of attributestoupdate) {
    product[key] =reqobj[key];
  }
  console.log(product)
  //without success response
  //return res.status(200).send("succesful partial update done ");
  //with success response
  return successResponse(res, "Product Partially  updated successfully", product);
};
exports.deleteProduct = (req, res) => {
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  });
  if (!product) {
    //without error response
    // return res.status(404).json({
    //   message: "Product not found",
    // });
    //with error response
    return errorResponse(res,"Product not found",404)
  }
  // const remproducts=products.filter((product)=>product.id!=productId)
  // products=remproducts
  const index = products.indexOf(product);
  products.splice(index, 1);
  //without success response
  //res.status(200).send("deleted succesfully");
  //with success response
  return successResponse(res, "Deleted successfully", null);
};