/** @format */

const asyncHandler = require("express-async-handler");
const Book = require("../model/bookModel");

// creating a new book and saving it to database
const createBookController = asyncHandler(async (req, res) => {
	const userId = req.userId;
	const { title, description, author, price, bookImageUrl } = req.body;
	// checking if any field is empty
	if (!title || !description || !author || !price || !bookImageUrl)
		return res.json({ error: "all the fields are required" });

	// need to check wheteher the book is already exists or not
	const existingBook = await Book.findOne({ where: { title } });
	console.log(existingBook);
	if (existingBook) return res.json({ error: "book already exists" });

	// if everything is fine then need to save the book to the database
	const book = await Book.create({
		title,
		description,
		author,
		price,
		bookImageUrl,
		UserId: userId,
	});
	try {
		res.json({ message: "book saved to databse", book });
	} catch (error) {
		return res.json({ error: error.message });
	}
});

// get all books
const getAllBooksController = asyncHandler(async (req, res) => {
	const result = await Book.findAll();
	try {
		if (result) {
			return res.json(result);
		}
	} catch (error) {
		return res.json({ error: error.message });
	}
});

// get a single book based on it's id
const getSingleBookController = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const result = await Book.findByPk(id);
	try {
		if (result) {
			return res.json(result);
		}
	} catch (error) {
		return res.json({ error: error.message });
	}
});

// update book
const updateBookController = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userId = req.userId;
	const { title, description, author, price, bookImageUrl } = req.body;
	const result = await Book.findByPk(id);
	if (result.UserId !== userId)
		return res.json({ error: "you are not allowed to do changes to this" });
	try {
		if (result) {
			await Book.update(
				{ title, description, author, price, bookImageUrl },
				{ where: { id } },
			);
			const updatedBook = await Book.findByPk(id);
			return res.json({ message: "updated successfully", updatedBook });
		}
	} catch (error) {
		return res.json({ error: error.message });
	}
});

// delete book
const deleteBookController = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const userId = req.userId;
	const result = await Book.findByPk(id);
	if (result.UserId !== userId)
		return res.json({ error: "you are not allowed to delete this" });
	try {
		if (result) {
			await Book.destroy({ where: { id } });
			return res.json({ message: "book deleted successfully" });
		}
	} catch (error) {
		return res.json({ error: error.message });
	}
});

module.exports = {
	createBookController,
	getAllBooksController,
	getSingleBookController,
	updateBookController,
	deleteBookController,
};
