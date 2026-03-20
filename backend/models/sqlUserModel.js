const { DataTypes } = require("sequelize");
const sequelize = require("../config/sqlConnection");

const SqlUser = sequelize.define("User",{
    name: DataTypes.STRING,
    email: DataTypes.STRING
});

module.exports = SqlUser;