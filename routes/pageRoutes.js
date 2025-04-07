// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import Book model
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware');
const { ensureVerified } = require("../middleware/authMiddleware");


// Signup Page (Public)
router.get('/', ensureGuest, (req, res) => {
    res.render('signup');
});

// Signup Page (Public)
router.get('/signup', ensureGuest, (req, res) => {
// router.get('/', ensureGuest, (req, res) => {
    res.render('signup');
});

// Login Page (Public)
router.get('/login', ensureGuest, (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('login');
});

// router.get("/dashboard", ensureAuth, ensureVerified, (req, res) => {
//     res.render("dashboard", { user: req.session.user });
// });

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const books = await Book.find().limit(5); // Fetch books
        res.render('dashboard', {
            user: req.session.user,
            books: books // Pass books to the template
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.redirect('/login');
    }
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