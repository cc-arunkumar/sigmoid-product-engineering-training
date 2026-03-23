const fs = require("fs");
const readline = require("readline");
const AppError = require("./AppError");

const processProductStream = (filePath) => {
    try {
        const stream = fs.createReadStream(filepath);
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });
        let count = 0;

        for await (const line of rl) {

            console.log("Processing product: ", line);
            count++;
        }
        return count;
    }
    catch (error) {
        throw new AppError(error.message || "Failed to process product stream", 500);
    }
};

module.exports = { processProductStream };



