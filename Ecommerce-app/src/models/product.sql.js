const { DataTypes } = require("sequelize");

const { sequelizeI } = require("../config/sql");

const ProductSQL = sequelizeI.define(
  "Product",

  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,

      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
    },

    stock: {
      type: DataTypes.INTEGER,

      defaultValue: 0,
    },
  },

  {
    tableName: "products",

    timestamps: true,
  },
);

module.exports = ProductSQL; 