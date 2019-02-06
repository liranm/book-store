const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isbn: {
    type: String,
    unique: true,
    match: /^\d{13}$/
  },
  author: { type: String, required: true },
  publication_date: { type: Date, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);