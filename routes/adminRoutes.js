const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");
const User = require("../models/User");

// ✅ Predefined admin credentials (hardcoded)
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "1";

// ✅ Multer Setup for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// ✅ Admin Login Page
router.get("/", (req, res) => {
    if (req.session.admin) return res.redirect("/admin/dashboard");
    res.render("adminSignup");
});

// ✅ Admin Login Handler
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.admin = { email };
        return res.redirect("/admin/dashboard");
    }
    res.status(401).render("adminSignup", { error: "Invalid email or password" });
});

// ✅ Admin Dashboard Route
router.get("/dashboard", async (req, res) => {
    if (!req.session.admin) return res.redirect("/admin");

    try {
        const books = await Book.find();
        const users = await User.find();
        res.render("adminDashboard", { 
            admin: req.session.admin, 
            books, 
            users 
        });
    } catch (err) {
        console.error("❌ Error fetching data:", err);
        res.status(500).send("Server error");
    }
});

// ✅ Add Book
router.post("/books/add", upload.single("image"), async (req, res) => {
    try {
        const { title, author, description, content } = req.body;
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
        res.status(500).render("adminDashboard", { 
            error: "Error adding book",
            admin: req.session.admin
        });
    }
});

// ✅ Update Book
router.post("/books/update/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, author, description, content } = req.body;
        const updateData = {
            title,
            author,
            description,
            content
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        await Book.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).render("adminDashboard", {
            error: "Error updating book",
            admin: req.session.admin
        });
    }
});

// ✅ Delete Book
router.post("/books/delete/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error("❌ Error deleting book:", err);
        res.status(500).render("adminDashboard", {
            error: "Error deleting book",
            admin: req.session.admin
        });
    }
});


// ✅ Block/Unblock User
router.post("/users/toggle-block/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error("❌ Error blocking/unblocking user:", err);
        res.status(500).send("Server error");
    }
});

// ✅ Admin Logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.redirect("/admin");
    });
});

module.exports = router;