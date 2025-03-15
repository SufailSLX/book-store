const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Route to fetch book details and render the read page
router.get("/read/:id", async (req, res) => {
    try {
        console.log("✅ Read Route Hit");
        console.log("📖 Book ID received:", req.params.id);
        
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            console.log("❌ Book not found in database");
            return res.status(404).send("Book not found");
        }

        console.log("✅ Book Found:", book);

        res.render("read", { book }); // Ensure this renders without errors
    } catch (error) {
        console.error("❌ Error fetching book:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
