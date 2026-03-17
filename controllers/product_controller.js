import { products } from "../data/product_data.js";
function getAllProducts(req,res){
    res.json(products)
}
export {getAllProducts}