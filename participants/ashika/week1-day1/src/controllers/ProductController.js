const products=require("../data/products");

exports.getallproducts=(req, res)=>{
    res.json(products);
} ;



exports.getproductbyId=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        return req.status(400).json({
            message:"data not found"
        })
    }
    res.json(product);
}

exports.createproducts=(req,res)=>{
    // const newProduct = { id:108, name:"tablet", price:40000 };

    const {name , price, category , stocks}=req.body

    const newProduct={
        id:100+products.length+1,
        name:name,
        price:price,
        category:category,
        stocks:stocks
    }

    products.push(newProduct)

    res.status(201).json({
        
        message:"data added",
        products:products
        
    })
    
}


exports.updateProduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        return req.status(400).json({
            message:"data not found"
        });

    }   

    const {name , price, category , stocks}=req.body
        
        product.name=name,
        product.price=price,
        product.category=category,
        product.stocks=stocks
    
     res.status(200).json(product)
}


exports.DeletebyId=(req,res)=>{
    const productId=req.params.id*1;
    const productIndex=products.findIndex(p=>p.id===productId)
     
    if(!productIndex ){
        return req.status(400).json({
            message:"data not found"
        })
    }

   products.splice(productIndex, 1);
    res.status(200).json(products);
}

exports.updatePartialProduct=(req,res)=>{
    const productId=parseInt(req.params.id);
    const product=products.find(p=>p.id===productId)
     
    if(!product){
        return req.status(400).json({
            message:"data not found"
        });

    }   

    const {name , price, category , stocks}=req.body
        if(name!=undefined) product.name=name;
        if(price!=undefined)product.price=price;
        if(category!=undefined)product.category=category;
        if(stocks!=undefined)product.stocks=stocks;
    
     res.status(200).json(product)
}
