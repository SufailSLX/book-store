const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import Book model
const { verifyToken } = require('../middleware/authMiddleware');
const { searchBooks } = require("../controllers/bookController");

// ✅ Route to Add a Book (Admin Only)
router.post('/add', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { title, author, description, content } = req.body;

        if (!title || !author || !content) {
            return res.status(400).json({ message: "Title, Author, and Content are required" });
        }

        const newBook = new Book({ title, author, description, content });
        await newBook.save();

        res.redirect('/admin/dashboard'); // Refresh admin dashboard
    } catch (error) {
        console.error("❌ Error adding book:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Route to Delete a Book (Admin Only)
router.post('/delete/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { id } = req.params;
        await Book.findByIdAndDelete(id);

        res.redirect('/admin/dashboard'); // Refresh admin dashboard
    } catch (error) {
        console.error("❌ Error deleting book:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q; // Get search query from frontend
        if (!query) {
            return res.json([]); // If query is empty, return an empty array
        }

        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },  // Case-insensitive search
                { author: { $regex: query, $options: 'i' } }
            ]
        }).limit(5); // Limit to 5 suggestions

        res.json(books); // Send filtered books as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.get("/search", searchBooks);
module.exports = router;
