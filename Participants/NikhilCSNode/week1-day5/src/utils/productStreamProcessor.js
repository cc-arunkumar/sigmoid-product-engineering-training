const fs = require('fs');
const readline = require('readline');

const processProductFile = async (filePath) => {
  try {
    const stream = fs.createReadStream(filePath);
    
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });
    
    let count = 0;
    for await (const line of rl) {
      // (const: parsing of csv row)
      console.log('Processing product:', line);
      count++;
    }
    
    return count;
  } catch (error) {
    throw new AppError(`Error processing product file ${filePath}`, 500);
  }
};

module.exports = processProductFile;
