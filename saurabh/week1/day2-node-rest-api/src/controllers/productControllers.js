const products = require("../data/product");

exports.getAllProducts=(req, res)=>{
    res.json(products);
}

exports.getProductById= (req, res)=>{
    const productId= parseInt(req.params.id);
    const product= products.find(p=>p.id===productId);
    if(!product){
        return res.status(400).json({
            message:"product not found"
        })
    }
    res.json(product);
}


exports.createProduct = (req,res)=>{
    
    const{name, price, category,stock}=req.body;

    const newP={
        id: products[products.length-1].id+1,
        name: name,
        price: price,
        category: category,
        stock: stock
    }
    console.log("Newly created Product = ",newP)
    products.push(newP);
    res.json({
        status:201,
        message:"created"
    })
}

exports.updateP= (req,res)=>{
    const productID= req.params.id*1;
    const product= products.find(p=>p.id===productID);
    if(!product){
        res.json({
            message:"product not found"
        })
    }
    const{name, price, category,stock}=req.body;

    product.name= name;
    product.price= price;
    product.category= category;
    product.stock= stock;

    res.status(200).json(product);
}
exports.deleteP =(req,res)=>{
    const productID= req.params.id*1;
    const product= products.findIndex(p=>p.id===productID);
    if(product===-1){
        return res.staus(404).json({
            message: "not found"
        })
    }
    products.splice(product,1);
    res.json({
        message: "product deleted"
    });
}

exports.patchP= (req,res)=>{
    const productID= req.params.id*1;
    const product= products.find(p=>p.id===productID);
    if(!product){
        return res.status(404).json({
            message:"not found"
        })
    }
    const{name, price, category,stock}=req.body;
    if(name!=undefined){
        product.name= name;
    }
    if(price!=undefined){
        product.price= price;
    }
    if(category!=undefined){
        product.category= category;
    }
    if(stock!= undefined){
        product.stock= stock;
    }
    res.status(200).json(product)

}
