// routes/bookRoutes.js
const express = require('express');
const Book = require('../models/Book');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new book (Admin only)
router.post('/add', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const { title, author, description, content } = req.body;
        const newBook = new Book({ title, author, description, content });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove a book (Admin only)
router.delete('/delete/:id', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all books (For all users)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
