const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});

module.exports = mongoose.model("Wishlist", WishlistSchema);