const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sql");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  category: DataTypes.STRING,
  stock: DataTypes.INTEGER
});

module.exports = Product;