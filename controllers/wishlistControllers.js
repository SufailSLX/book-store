const Wishlist = require("../models/Wishlist");

// ✅ Get Wishlist Books
exports.getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("books");

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, books: [] });
            await wishlist.save();
        }

        res.render("wishlist", { wishlistBooks: wishlist.books });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).send("Server Error");
    }
};

// ✅ Add Book to Wishlist
exports.addToWishlist = async (req, res) => {
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
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Remove Book from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { bookId } = req.params;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (wishlist) {
            wishlist.books = wishlist.books.filter(id => id.toString() !== bookId.toString());
            await wishlist.save();
        }

        res.json({ success: true, message: "Book removed from wishlist" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ error: "Server error" });
    }
};
