const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Get Wishlist Page
router.get("/", verifyToken, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("books");
        if (!wishlist) wishlist = { books: [] };
        res.render("wishlist", { wishlistBooks: wishlist.books });
    } catch (error) {
        console.error("Error loading wishlist:", error);
        res.status(500).send("Server Error");
    }
});

// ✅ Get Wishlist Data (AJAX)
router.get("/list", verifyToken, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("books");
        if (!wishlist) wishlist = { books: [] };
        res.json(wishlist.books);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Add Book to Wishlist
router.post("/add", verifyToken, async (req, res) => {
    try {
        const { bookId } = req.body;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, books: [] });
        }

        if (!wishlist.books.includes(bookId)) {
            wishlist.books.push(bookId);
            await wishlist.save();
        }

        res.json({ success: true, message: "Book added to wishlist" });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Remove Book from Wishlist
router.delete("/remove/:bookId", verifyToken, async (req, res) => {
    try {
        const { bookId } = req.params;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (wishlist) {
            wishlist.books = wishlist.books.filter(id => id.toString() !== bookId);
            await wishlist.save();
        }

        res.json({ success: true, message: "Book removed from wishlist" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
