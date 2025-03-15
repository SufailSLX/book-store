const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware');

require('dotenv').config();

// ✅ Configure Multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/', // Save images in "uploads" folder
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ User Signup Route
router.post('/signup', async (req, res) => {
    console.log("✅ Signup Route Hit! Request Body:", req.body);

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name, email, role }
        });

    } catch (error) {
        console.error("❌ Signup error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ User Login Route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.cookie("token", token, { httpOnly: true });

//         return res.redirect('/api/auth/dashboard');

//     } catch (error) {
//         console.error("❌ Login error:", error.message);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// ✅ User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                errorMessage: "Email and password are required",
                emailError: !email ? "Email is required" : "",
                passwordError: !password ? "Password is required" : ""
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).render('login', {
                errorMessage: "Invalid credentials",
                emailError: "Invalid email or password",
                passwordError: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render('login', {
                errorMessage: "Invalid credentials",
                emailError: "Invalid email or password",
                passwordError: "Invalid email or password"
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });

        return res.redirect('/api/auth/dashboard');

    } catch (error) {
        console.error("❌ Login error:", error.message);
        res.status(500).render('login', {
            errorMessage: "Server error",
            emailError: "",
            passwordError: ""
        });
    }
});

// ✅ User Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

// ✅ Dashboard Route (Admin & Users)
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const books = await Book.find();

        if (user.role === 'admin') {
            return res.render('adminDashboard', { user, books });
        }

        res.render('dashboard', { user, books });

    } catch (error) {
        console.error("❌ Dashboard Error:", error.message);
        res.redirect('/login');
    }
});

// ✅ Admin: Add a Book (with image upload)
router.post('/books/add', verifyToken, upload.single('image'), async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { title, author, description, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : ''; // Store image path

        if (!title || !author || !content) {
            return res.status(400).json({ message: "Title, Author, and Content are required" });
        }

        const newBook = new Book({ title, author, description, content, image });
        await newBook.save();

        res.redirect('/api/auth/dashboard');

    } catch (error) {
        console.error("❌ Error adding book:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Admin: Delete a Book
router.post('/books/delete/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { id } = req.params;
        await Book.findByIdAndDelete(id);

        res.redirect('/api/auth/dashboard');

    } catch (error) {
        console.error("❌ Error deleting book:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Serve uploaded images
router.use('/uploads', express.static('uploads'));

module.exports = router;