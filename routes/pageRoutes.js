const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');  // ✅ Correct import

// Signup Page (Public)
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Login Page (Public)
router.get('/login', (req, res) => {
    res.render('login');
});


// Home Page (Protected)
router.get('/home', ensureAuth, (req, res) => {
    res.render('home', { user: req.user });
});



// Book Details Page (Protected)
router.get('/books/:id', ensureAuth, (req, res) => {
    const bookId = req.params.id;
    res.render('bookDetails', { bookId });
});

module.exports = router;
