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

export const modifyProduct = (req,res) =>{
    const {id,name,price,stock} = req.body;
    const product = products.find(p=> p.id == id);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    else{
    product.name = name;
    product.price = price;
    product.stock = stock;
    res.status(200).json(product);
    }
};

export const deleteProduct = (req,res) =>{
    const productId = req.params.id;
    const product = products.find(p=> p.id == productId);
    const index = products.findIndex(p=> p.id == productId);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    else{
        const deleted = products.splice(index,1);
        res.status(202).json({message:`Product with ${productId}`});
    }
}

