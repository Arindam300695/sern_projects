const { DataTypes } = require("sequelize");
const sequelize = require("../database/databse");
const User = sequelize.define("User", {
	// Model attributes are defined here
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = User;
