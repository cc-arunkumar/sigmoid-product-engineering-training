const product  = require("../Data/data")

exports.getallProducts = (req , res) =>{
    res.json(product)
}