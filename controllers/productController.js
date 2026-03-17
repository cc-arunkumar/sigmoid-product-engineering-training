const products = require("../data/products");
// get all prouduct
exports.getAllProducts = (req, res) => {
    res.json(products);
};

// get product by id
exports.getProductById = (req, res) =>{
  const productId = parseInt(req.params.id);
    const findProduct = products.find(p => p.id === productId);

    if(!findProduct){
       return res.status(404).json({
        message : " product  not found"
       })
    }
    res.json(findProduct);
}

// create new product
 exports.createProduct = (req ,res)=>{
   const {id , name , price , category , stock , brand} = req.body;

   const newProduct = {
    id : id,
    name : name,
    price : price,
    category : category,
    stock : stock,
    brand : brand
   }
   products.push(newProduct);
   res.status(201).json(newProduct);
 }

 // update product
 
 exports.updateProduct = (req , res) =>{
  const productId = parseInt(req.params.id);
  const findProduct = products.find(p => p.id === productId);

  if(!findProduct){
    return res.status(404).json({
      message: "Product not found"
    })
  }
  const {id , name , price , category , stock , brand} = req.body;

  findProduct.id = id,
  findProduct.name = name,
  findProduct.price = price,
  findProduct.category = category,
  findProduct.stock = stock,
  findProduct.brand = brand

  res.json(findProduct);
 }
// delete product
exports.deleteProduct = (req , res) =>{
  const productId = parseInt(req.params.id);

  const findProductIndex = products.findIndex(p => p.id === productId);

  if(findProductIndex == -1){
    return res.status(404).json({
      message: "Product not found"
    })
  } 
  products.splice(findProductIndex,1);

  res.json({
    message: "Product deleted successfully"
  })
  }

// patch product
exports.patchProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const findProduct = products.find(p => p.id === productId);

  if (!findProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(findProduct, req.body);
  res.json(findProduct);
};
