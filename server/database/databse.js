/** @format */

const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_URI);

module.exports = sequelize;
