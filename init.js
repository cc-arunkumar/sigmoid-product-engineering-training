require("dotenv").config();

const connectMongo = require("./config/mongo");
const { connectSQL, sequelize } = require("./config/sql");

const ProductSQL = require("./models/product.sql");
const ProductMongo = require("./models/product.mongo");

const products = require("./data/products");

// Toggle DB
const USE_MONGO = true;
const USE_SQL = true;

const initDB = async () => {
  try {
    console.log("🚀 Initializing Database...");

    // ------------------ MONGO ------------------
    if (USE_MONGO) {
      await connectMongo();

      await ProductMongo.deleteMany();
      await ProductMongo.insertMany(products);

      console.log("✅ MongoDB seeded");
    }

    // ------------------ SQL ------------------
    if (USE_SQL) {
      await connectSQL();

      await sequelize.sync({ force: true }); // recreate table

      await ProductSQL.bulkCreate(products);

      console.log("✅ MySQL seeded");
    }

    console.log("🎉 Database initialization completed");
    process.exit();

  } catch (error) {
    console.error("❌ Init failed:", error.message);
    process.exit(1);
  }
};

initDB();