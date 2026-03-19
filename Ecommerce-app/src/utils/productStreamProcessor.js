const fs = require("fs");
const readline = require("readline");
const AppError = require("./AppError");

const processProductFile = async (filePath) => {
    try {
        const stream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        let count = 0;
        for await (const line of rl) {
            // Process each line (product) here
            console.log(`Processing product: ${line}`);
            count++;
        }
    } catch (error) {
        throw new AppError("Failed to process product file", 500);
    }
}

module.exports = processProductFile;