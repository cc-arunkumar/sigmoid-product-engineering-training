const products = require('../data/products');

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if(!product){
    return res.status(404).json({ message: 'Product not found' });
  }
    res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
}

exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if(!product){
        return res.status(404).json({ message: 'Product not found' });
    }
   else{
    const { name, price, category, stock } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    res.status(200).json(product);  

}
}

exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if(productIndex === -1){
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(productIndex, 1);
    res.status(204).send();
}
