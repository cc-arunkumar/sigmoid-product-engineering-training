const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    category: String,
    Stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);