// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true } // Book content or PDF URL
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
