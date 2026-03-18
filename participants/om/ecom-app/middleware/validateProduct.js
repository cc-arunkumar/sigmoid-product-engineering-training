const { errorResponse } =require("../utils/apiResponse");

const validate=(req, res , next)=>{
    const { name , price , category , stocks}=req.body;

    if(!name || name.trim==="" || typeof name!=="string"){
        return errorResponse( res, "please enter valid name" , 400 );
    }

    if(!price || price<=0 || typeof price!=="number"){  
        return errorResponse( res, "price cannot be negative" , 400 )
    }
    if(!category || category.trim===""|| typeof category!=="string"){
        return errorResponse( res, "category is required" , 400 )
    }
    if(stocks===undefined||stocks<0 || typeof stocks!=="number"){
        return errorResponse( res, "please enter valid stocks" , 400 )
    }

    next();
}

module.exports=validate;