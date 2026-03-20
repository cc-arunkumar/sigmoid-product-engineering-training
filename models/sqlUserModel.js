const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sqlConnection");

const SqlUser = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: true
    }
);

module.exports = SqlUser;