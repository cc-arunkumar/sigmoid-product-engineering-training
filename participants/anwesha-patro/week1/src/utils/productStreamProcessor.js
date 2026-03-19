const fs = require("fs");
const readline = require("readline");
const AppError = require("../utils/appError");

const processProductFile = async (filepath) => {
    try {
        const stream = fs.createReadStream(filepath);
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        let count = 0;
        for await (const line of rl) {
            console.log("Processing Product:", line);
            count++;
        }

        return count; // total lines processed

    } catch (error) {
        throw new AppError(error.message || "Failed to process product", 500);
    }
};

module.exports = processProductFile;