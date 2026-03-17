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
function createProduct(req, res){
    const {name,price}=req.body
    const newProduct={
        id: products.length+1,
        name:name,
        price:price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
}
function updateProduct(req, res){
    const productId=parseInt(req.params.id)
    const product=products.find(p=>p.id===productId)
    if(!product) return res.status(404).json({message:"Product not found"})
    const {name,price}=req.body
    product.name=name
    product.price=price
    res.json(product)
}
export {getAllProducts,getProductById,createProduct,updateProduct}