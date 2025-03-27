const express = require('express');
const passport = require("passport");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware');
require("../config/passport");
require("dotenv").config();

// ✅ Configure Multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google OAuth Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            console.log("✅ Google OAuth Callback Hit!");
            console.log("🔹 Google User Profile:", req.user);

            let user = await User.findOne({ email: req.user.email });

            if (!user) {
                user = new User({
                    googleId: req.user.id,
                    name: req.user.displayName,
                    email: req.user.email,
                    password: "",
                    role: "user",
                });
                await user.save();
            } else if (!user.googleId) {
                // ✅ If user exists but has no googleId, update it
                user.googleId = req.user.id;
                await user.save();
            }

            // ✅ Create JWT Token
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie("token", token, { httpOnly: true });
            req.session.user = user; // ✅ Store session

            console.log("✅ User Logged In:", user.email);
            return res.redirect("/api/auth/dashboard"); 
        } catch (error) {
            console.error("❌ Google Auth Error:", error.message);
            return res.redirect("/login");
        }
    }
);

// ✅ User Signup Route
router.post('/signup', ensureGuest, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });
        req.session.user = newUser;

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name, email, role }
        });

    } catch (error) {
        console.error("❌ Signup error:", error.message);
        return res.status(500).json({ error: "Server error" });
    }
});

// ✅ User Login Route
router.get('/login', ensureGuest, (req, res) => {
    if (req.session.user) {
        return res.redirect('/api/auth/dashboard');
    }
    res.render('login'); // Render the login page
});

router.post('/login', ensureGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });
        req.session.user = user;

        return res.redirect('/api/auth/dashboard');

    } catch (error) {
        console.error("❌ Login error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
});

// ✅ User Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Session destruction error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        return res.redirect('/login');
    });
});

// ✅ Dashboard Route (Ensuring Session Persists)
router.get('/dashboard', ensureAuth, async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const user = req.session.user;
        const books = await Book.find();

        if (user.role === 'admin') {
            return res.render('adminDashboard', { user, books });
        }

        return res.render('dashboard', { user, books });

    } catch (error) {
        console.error("❌ Dashboard Error:", error.message);
        return res.redirect('/login');
    }
});

module.exports = router;
