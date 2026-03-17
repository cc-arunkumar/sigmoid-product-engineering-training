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


getProductById=(req,res,next)=>{
    const productId= (req.params.id)*1;
    console.log(productId);
    
    const product=products.find(p=>p.id===productId)
    if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
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







const updateProducts =(req,res)=>{
     const productId= Number(req.params.id);
    console.log(productId);
    
    const product=products.find(p=>p.id===productId)
   if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }
     const {name,price,stock,category}=req.body;
     product.name=name;
     product.price=price;
     product.stock=stock;
     product.category=category;

     res.status(200).json({
        data:product
     })
}


const patchProduct = (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find(p => p.id === productId);

if(!product){
        const error=new Error("wrong ID");
        error.statusCode=404
        return next(error)
    }
  Object.keys(req.body).forEach(key => {
    product[key] = req.body[key];
  });

  res.status(200).json({
    status: "success",
    data: product
  });
};


const deleteById=(req,res)=>{
const productId= Number(req.params.id);
  products=  products.filter((p)=>p.id!==productId)



res.status(200).json({
    products
})
        
}




module.exports={
    getAllProducts,
     getProductById,
     createProduct,
     updateProducts,
     patchProduct,
     deleteById
}