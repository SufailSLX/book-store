// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware');
const Book = require('../models/Book'); // Import Book model

// Signup Page (Public)
router.get('/', ensureGuest, (req, res) => {
    res.render('signup');
});

// Signup Page (Public)
router.get('/signup', ensureGuest, (req, res) => {
    res.render('signup');
});

// Login Page (Public)
router.get('/login', ensureGuest, (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('login');
});

// Home Page (Protected)
router.get('/home', ensureAuth, async (req, res) => {
    try {
        const user = req.session.user; // Use session user
        const books = await Book.find(); // Fetch books from database
        res.render('home', { user, books });
    } catch (error) {
        console.error("❌ Home Page Error:", error.message);
        res.redirect('/login');
    }
});

// Book Details Page (Protected)
router.get('/books/:id', ensureAuth, (req, res) => {
    const bookId = req.params.id;
    res.render('bookDetails', { bookId });
});

module.exports = router;