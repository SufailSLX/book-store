const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

// ✅ Predefined admin credentials (hardcoded)
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

// ✅ Multer Setup for File Uploads
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// ✅ Admin Login Page
router.get("/", (req, res) => {
    if (req.session.admin) {
        return res.redirect("/admin/dashboard");
    }
    res.render("adminSignup");
});

// ✅ Admin Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // ✅ Check hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.admin = { email };
        return res.redirect("/admin/dashboard");
    }

    res.status(401).send("Invalid email or password");
});

// ✅ Admin Dashboard Route - Fetch Books
router.get("/dashboard", async (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/admin");
    }

    try {
        const books = await Book.find();
        res.render("adminDashboard", { admin: req.session.admin, books }); 
    } catch (err) {
        console.error("❌ Error fetching books:", err);
        res.status(500).send("Server error");
    }
});

// ✅ Add Book Route
router.post("/books/add", upload.single("image"), async (req, res) => {
    try {
        const { title, author, description, content } = req.body;

        // ✅ Save new book
        const newBook = new Book({
            title,
            author,
            description,
            content,
            image: req.file ? `/uploads/${req.file.filename}` : null, 
        });

        await newBook.save();
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error("❌ Error adding book:", err);
        res.status(500).send("Server error");
    }
});

router.post("/books/delete/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard")
    } catch (err) {
        console.error("❌ Error deleting book:", err);
        res.status(500).send("Server error");
    }
});


// ✅ Admin Logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.redirect("/admin");
    });
});

module.exports = router;
