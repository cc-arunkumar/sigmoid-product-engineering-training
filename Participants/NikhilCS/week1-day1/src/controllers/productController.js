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