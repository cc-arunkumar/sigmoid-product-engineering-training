const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const connectDb = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("✅ DB connection successful");
    })
    .catch((err) => {
      console.error("❌ DB connection error:", err.message);
    });
};

module.exports = connectDb;
