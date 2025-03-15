const Book = require("../models/Book"); // Import the Book model

exports.searchBooks = async (req, res) => {
    try {
        const query = req.query.q || ""; // Get search query from URL parameters

        // If the query is empty, return all books instead of an empty array
        let books;
        if (query.trim() === "") {
            books = await Book.find(); // Fetch all books
        } else {
            books = await Book.find({
                $or: [
                    { title: { $regex: query, $options: "i" } }, // Case-insensitive search
                    { author: { $regex: query, $options: "i" } }
                ]
            });
        }

        res.json({ books }); // Send search results as JSON
    } catch (error) {
        console.error("Error searching books:", error);
        res.status(500).json({ error: "Server error" });
    }
};
