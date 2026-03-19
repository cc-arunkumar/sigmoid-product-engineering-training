import fs from "fs";
import readline from "readline";
import AppError from "../utils/appError";

const processProductFile = async(filePath) =>{
    try{
        const stream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input:stream,
            crlfDelay:Infinity
        });

        let count = 0;

        for await (const line of rl){
            //Example:parsing CSV row
            console.log("Processing product:" , line);
            count++;
        }

        return count;

    }
    catch(error){
        throw new AppError("Error processing product file" , 500);
    }
};

export default processProductFile;