



exports.successResponse =(res , message , data , statusCode = 200 )=>{
    console.log("calling for the created product")
    return res.status(statusCode).json({
        success:true, 
        message : message , 
        data : data 
    })
}


exports.errorResponse = (res , message , statusCode = 500)=>{
    return res.status(statusCode).json({
        success : false , 
        message : message ,
    });
};


// class errorResponse {
//     constructor(message = "Error", statusCode = 500) {
//         this.success = false;
//         this.message = message;
//         this.statusCode = statusCode;
//     }
// }


// class successResponse {
//     constructor(message = "Success", data = null) {
//         this.success = true;
//         this.message = message;
//         this.data = data;
//     }
// }

// module.exports = {
//     successResponse,
//     errorResponse
// };