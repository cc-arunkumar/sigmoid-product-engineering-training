const products = require("../data/products")
exports.getALLProducts = (req, res) => {
    res.json(products);
};
exports.getProductById = (req , res) => {

    const productid = parseInt(req.params.id);
    
    const product = products.find( p => p.id === productid);

    if(!product){
       return  res.status(404).json({
            message: "Product Not Found"
        })
    }
    res.json(product);

}
exports.createProduct = (req , res) => {
    const {id, name , price} = req.body;

    const newProduct = {
        id : products.length + 1 , 
        name : name,
        price : price
    };
    products.push(newProduct);
           res.status(201).json(newProduct)
}
exports.updateProduct = (req, res) => { 
    const productid = req.params.id * 1;

   const product = products.find(p => p.id === productid);

   if(!product){
     return res.status(400).json({
        message : "Product Is Not Found"
    });
   }
   const {name , price} = req.body;

   product.name = name;
   product.price = price;

console.log(products)
   res.status(201).json(product)

}

exports.deleteProduct = (req, res) => {
    const productid = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === productid);

    if (index === -1) {
        return res.status(404).json({
            message: "Product Not Found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    return res.status(200).json({
        message: "Product deleted successfully",
   
    });
};
exports.patchProduct= (req , res) => {
    const productid = parseInt(req.params.id);
    const product = products.find(p => p.id === productid);
    if(!product){
        return res.status(404).json(
            {
                message: "Product Not found"
            }
        )
    }
    const {name , price} = req.body;
    if(name !== undefined){
        product.name = name;
    }
    if(price !== undefined){
        product.price = price;
    }
    return res.status(201).json(product);
}

