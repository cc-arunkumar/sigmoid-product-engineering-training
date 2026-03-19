const fs=require("fs");
const readline=require("readline");
const AppError=require("./AppError");

const processProductFile =async(filePath)=>{
    try{
        const stream =fs.createReadStream(filePath);

        const r1=readline.createInterface({
            input:stream,
            crlfDelay:Infinity
        });
        let count=0;

        for await(const line of rl){
            //Example: parsing csv row
            console.log("Processing Product:",line);
            count++;
        }
        return count;
    } catch(error){
        throw new AppError("Error processing product file",500);
    }
};
module.exports=processProductFile;