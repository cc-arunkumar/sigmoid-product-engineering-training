const product  = require("../Data/data")

exports.getallProducts = (req , res) =>{
    res.json(product)
}



exports.getproductbyId = (req , res)=>{
    const prodid = req.params.id *1;  
    const prodfoundid = product.find(p => p.id === prodid) ; 

    if(!prodfoundid){
        return res.status(400).json({
            massage: "Not Found" 
        })
    }
    return res.json(prodfoundid)

}


exports.postproduct = (req , res)=>{
    const {name , price , brand } = req.body;
    

    const newproduct = {
        id : product.length+1 , 
        name : name , 
        price : price  , 
        brand : brand , 
    }
    product.push(newproduct);

    return res.status(201).json(newproduct) ; 
}

exports.putproduct = (req , res)=>{
    const {id , name , price  , brand } = req.body ; 

    const productfound = product.find(p => p.id== id) ; 

    productfound.name = name ; 
    productfound.price = price ; 
    productfound.brand = brand ; 

    return res.status(200).json(productfound);
}