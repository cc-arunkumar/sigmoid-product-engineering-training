const {DataTypes}=require("sequelize");
const {sequelize}=require("../config/sql");
module.exports=sequelize.define("Product",{name:DataTypes.STRING,price:DataTypes.FLOAT});