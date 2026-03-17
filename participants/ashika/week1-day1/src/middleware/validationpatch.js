const patchvalidate=(req, res)=>{
    const { name , price , category , stocks}=req.body;

    if(name!==undefined){
           if(!name || name.trim()===""){
        return res.status(400).json({
            success:false,
            message:"please enter name"
        })
    }

    }
    
   if(price!==undefined){
    if(!price || price<=0 ){
         return res.status(400).json({
            success:false,
            message:"proce cannot be negative"
        })
    }
}

  if(category!==undefined){
    if(!category || category.trim()===""){
         return res.status(400).json({
            success:false,
            message:"category is required"
        })
    }
}

if(stocks!==undefined){
    if(stocks===undefined||stocks<0){
         return res.status(400).json({
            success:false,
            message:"please enter valid stocks"
        })
    }

}
}

module.exports=patchvalidate;