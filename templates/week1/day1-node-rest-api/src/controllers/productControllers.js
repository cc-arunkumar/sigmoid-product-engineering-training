import products from "../data/products.js";

export const getAllProducts =  (req,res) => {

    res.json(products);
};

export const getProductById = (req,res) => {
    const productId = (req.params.id);
    const product = products.find(p=> p.id == productId);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.json(product);

};

export const createProduct = (req,res) =>{
    const {name,price,stock} = req.body;
    const new1 = {
        name,price,stock
    };
    products.push(new1);
    res.status(201).json(new1);

};



