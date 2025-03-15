const Book = require('../models/Book');
const User = require('../models/User'); // In case we need user details

// Show admin dashboard
exports.getDashboard = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('dashboard', { books, user: req.user });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Server Error");
    }
};

// Add a book (Admin only)
exports.addBook = async (req, res) => {
    try {
        const { title, author, description, content } = req.body;
        if (!title || !author || !content) {
            return res.status(400).json({ message: "Title, author, and content are required" });
        }
        const newBook = new Book({ title, author, description, content });
        await newBook.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Server Error");
    }
};

// Remove a book (Admin only)
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send("Server Error");
    }
};
