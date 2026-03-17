import { products } from "../data/product_data.js";
function getAllProducts(req,res){
    res.json(products)
}
function getProductById(req, res){
    const productId=parseInt(req.params.id)
    const product=products.find(p=>p.id===productId)
    if(!product) return res.status(404).json({message:"Product not found"})
    else return res.json(product)      
}
export {getAllProducts,getProductById}