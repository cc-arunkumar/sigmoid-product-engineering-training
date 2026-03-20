const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlconnection');  // Adjust path if needed

const SQLUser = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'users',     // Exact table name
  timestamps: false       // No createdAt/updatedAt
});

module.exports = SQLUser;
