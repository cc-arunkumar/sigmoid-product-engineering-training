const fs = require("fs");
const readline = require("readline");
const AppError = require("./AppError");

const processProductFile = async(filePath)=>{
    try{
        const stream = fs.createReadStream(filePath);

        const r1 = readline.createInterface({
            input:stream,
            cr1Delay:Infinity
        });

        let count =0;

        for await (const line of r1){
            //Example:parsing CSV row
            console.log("Processing product:",line);
            count++;
        }
        return count;
    }catch(error){
        throw new AppError("Error processing product file",500);
    }
};
module.exports=processProductFile;