const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    image: { type: String } // ✅ Image field for book cover
});

module.exports = mongoose.model('Book', BookSchema);
