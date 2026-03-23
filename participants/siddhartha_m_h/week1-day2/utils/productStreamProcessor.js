const fs = require("fs");
const readline = require("readline");
const AppError = require("./appError");

const processProductFile = async (filePath) => {
    try{
        const stream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });
        let count = 0;
        for await (const line of rl) {
            console.log(line);
            count++;
        }

        return count;
    } catch (err) {
        throw new AppError(`Error processing file: ${err.message}`, 500);
    }
};

module.exports = { processProductFile };