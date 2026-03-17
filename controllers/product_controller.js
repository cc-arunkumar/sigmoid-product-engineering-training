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
    const {name,price,category,stock}=req.body
    const newProduct={
        id: products.length+1,
        name:name,
        price:price,
        category:category,
        stock:stock
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
}
function updateProduct(req, res){
    const productId=parseInt(req.params.id)
    const product=products.find(p=>p.id===productId)
    if(!product) return res.status(404).json({message:"Product not found"})
    const {name,price,category,stock}=req.body
    product.name=name
    product.price=price
    product.category=category
    product.stock=stock
    res.json(product)
}
function deleteProduct(req, res){
    const productId=parseInt(req.params.id)
    const product_index=products.findIndex(p=>p.id===productId)
    if(product_index===-1){
        return res.status(404).json({message:"Product not found"})
    }
    products.splice(product_index,1)
    return res.json({message:"Product deleted successfully"})
}
function partialUpdate(req,res){
    const productId=parseInt(req.params.id)
    const product=products.find(p=>p.id===productId)
    if(!product) return res.status(404).json({message:"Product not found"})
    const {name,price,category,stock}=req.body
    if(name) product.name=name
    if(price) product.price=price
    if(category) product.category=category
    if(stock) product.stock=stock
    return res.json(product)
}
export {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,partialUpdate}