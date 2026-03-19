const processProductFile = require("./src/utils/productStream");

(async () => {
    try {
        const count = await processProductFile("./product.txt");
        console.log("Total products processed:", count);
    } catch (err) {
        console.error(err.message);
    }
})();