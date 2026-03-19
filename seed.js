require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product.mongo");
const products = require("./data/products");

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await Product.deleteMany();
        console.log("Existing products cleared");

        const inserted = await Product.insertMany(
            products.map(({ name, price, category, stock }) => ({ name, price, category, stock }))
        );
        console.log(`${inserted.length} products inserted`);

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error.message);
        process.exit(1);
    }
};

seed();
