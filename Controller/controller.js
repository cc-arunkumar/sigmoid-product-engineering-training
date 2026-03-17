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