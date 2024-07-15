const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Order = sequelize.define("Order", {
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Order;
