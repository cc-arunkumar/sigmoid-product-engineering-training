let products = require("../data/products");


getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products
    }
  });
};










module.exports={
    getAllProducts

}