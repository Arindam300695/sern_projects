const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const saltrounds = 12;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// registration controller
const registrationController = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, age, password } = req.body;

	// checking if no any field is empty or not
	if ((!firstName || !lastName, !email || !age || !password))
		return res.json({ error: "all the fields are required" });

	// checking if the user is already registered with the provided email address or not
	const result = await User.findOne({
		where: {
			email,
		},
	});
	if (result) return res.json({ error: "user already exists" });

	// if the user is not already registered then need to hash the provided password
	const hashedPassword = await bcrypt.hash(password, saltrounds);
	await User.create({
		firstName,
		lastName,
		email,
		age,
		password: hashedPassword,
	});
	try {
		const user = { name: firstName + " " + lastName, email, age };
		return res.json({ message: "registration successfull", user });
	} catch (error) {
		return res.json({ error: error.message });
	}
});

// login controller
const loginController = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// checking if no any field is empty or not
	if (!email || !password)
		return res.json({ error: "all the fields are required" });

	// checking if the user is already registered with the provided email address or not
	const result = await User.findOne({
		where: {
			email,
		},
	});
	if (!result) return res.json({ error: "user is not registered" });

	// if the user is registered then need to compare the provided password with the hashed one that is already saved in the database
	const isMatched = await bcrypt.compare(password, result.password);
	if (!isMatched) return res.json({ error: "Invalid login credentials" });

	// if everything is fine then need to login the user and need to create a token which will be json to the user after successful login
	const token = jwt.sign({ id: result.id }, process.env.secret_key);
	const user = {
		userName: result.firstName + " " + result.lastName,
		userEmail: result.email,
		userAge: result.age,
	};
	try {
		return res.json({ message: "login successfull", user, token });
	} catch (error) {
		return res.json({ error: error.message });
	}
});

module.exports = { registrationController, loginController };
