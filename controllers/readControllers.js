const Book = require("../models/Book");

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.render("readBook", { book });
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send("Server Error");
    }
};
