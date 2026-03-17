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


getProductById=(req,res)=>{
    const productId= (req.params.id)*1;
    console.log(productId);
    
    const product=products.find(p=>p.id===productId)
    if(!product){
        return res.status(404).json({
            status:"fial",
            message:"wrong ID"
        })
    }

    res.json(product)
}


createProduct = (req,res)=>{
      
    const {name,price,stock,category}=req.body;


    const newProduct={
        id:products.length+1,
        name,
        price,
        category,
        stock
    }


    products.push(newProduct);
    res.status(201).json({
        status:"pass",
        data:newProduct
    })
}












module.exports={
    getAllProducts,
     getProductById,
     createProduct
}