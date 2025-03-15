const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

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

        // Debugging: Log the bookId
        console.log("Book ID to remove:", bookId);

        // Ensure bookId is valid
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }

        // Convert bookId to ObjectId using the `new` keyword
        const objectId = new mongoose.Types.ObjectId(bookId);

        // Find the user's wishlist
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        // Debugging: Log the wishlist
        console.log("Wishlist before removal:", wishlist);

        if (wishlist) {
            // Filter out the bookId from the wishlist
            wishlist.books = wishlist.books.filter(id => {
                if (id && id.toString) {
                    return id.toString() !== objectId.toString();
                }
                return false; // Skip invalid or null IDs
            });

            // Debugging: Log the updated wishlist
            console.log("Wishlist after removal:", wishlist);

            // Save the updated wishlist
            await wishlist.save();
        }

        res.json({ success: true, message: "Book removed from wishlist" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;