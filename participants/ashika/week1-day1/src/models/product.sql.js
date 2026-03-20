const { DataTypes } = require("sequelize");

const { sequelize } = require("../config/sqlconnection");


const ProductSQL = sequelize.define(

    "Product",

    {

        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },

        name: {

            type: DataTypes.STRING,

            allowNull: false

        },

        price: {

            type: DataTypes.FLOAT,

            allowNull: false

        },

        category: {

            type: DataTypes.STRING

        },

        stocks: {

            type: DataTypes.INTEGER,

            defaultValue: 0

        }

    },

    {

        tableName: "Products",

        timestamps: true

    }

);


module.exports = ProductSQL;