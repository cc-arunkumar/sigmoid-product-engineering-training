const products = require("../data/products");
//defautl exports
exports.getAllProducts = (req, res) => {
  res.json(products);
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
    return res.status(404).json({
      message: "Product not found",
    });
    //we could do
    //return res.status(404).send({
    //         message:"Product not found"
    // })
  }
  res.json(product);
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
  res.status(201).json(newProduct);
};
exports.updateProduct = (req, res) => {
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  //
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  const { name, price, category, stock } = req.body;
  product.name = name;
  product.price = price;
  product.category = category;
  product.stock = stock;
  return res.status(200).send("succesful update done ");
};
exports.updatePartialProduct = (req, res) => {
  const productId = Number(req.params.id);
  console.log(productId);
  const product = products.find((product) => {
    return product.id === productId;
  }); //if we search or find here for a non exisent ided object that is an object without the required id ,so non existent product then emptty object ,product has non data response then we go for the status code of 404 being sent
  //one important thing about the ffind operation in js on array processing is it returns a refeence or a pointer of srots to the same memory location so when weedit this object returned in memory this object is edited at same sport we are not egtting a copy of the object so it is not like we have to pop the object then repush it is by reference
  //
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  let reqobj = req.body;
  let attributestoupdate = Object.keys(reqobj);
  console.log(attributestoupdate)
  for (let key of attributestoupdate) {
    product[key] =reqobj[key];
  }
  console.log(product)
  return res.status(200).send("succesful partial update done ");
};