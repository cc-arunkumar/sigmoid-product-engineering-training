
const validateProduct = (req, res , next) =>{
  const { name , price , category , stock , brand} = req.body;

   if(name !== undefined || name.trim()===""){
    return res.status(400).json({
      success : false,
      message : " product name is required"
    })
   }

   if(price !== undefined || price <= 0){
    return res.status(400).json({
      success : false,
      message : "Valid product price is required"
    })
   }

   if(category !== undefined || category.trim()===""){
    return res.status(400).json({
      success : false,
      message : " product category is required"
    })
   }

   if(stock === undefined || stock < 0){
    return res.status(400).json({
      success : false,
      message : "Valid product stock is required"
    })
   }
   if(brand !== undefined || brand.trim()===""){
    return res.status(400).json({
      success : false,
      message : " product brand is required"
    })
   }

   next();
}


module.exports = validateProduct;