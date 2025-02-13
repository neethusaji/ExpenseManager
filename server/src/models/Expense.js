const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Expense = sequelize.define("Expense", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.ENUM("Income", "Expense"), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: true });

module.exports = Expense;
