const fs=require("fs");
const readline=require("readline");
const appError=require("./appError");
const processProductFile=async(filePath)=>{
    try{
        const stream=fs.createReadStream(filePath);
        const rl=readline.createInterface({
            input:stream,
            crlfDelay:Infinity
        });
        let count=0;
        for await(const line of rl){
            console.log(`Line ${count}: ${line}`);
            count++;
        }
        return count;
    }catch(error){
        throw new appError("Error processing product file" ,500);
    }
};
module.exports=processProductFile;