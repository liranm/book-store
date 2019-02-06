const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  isbn: {
    type: String,
    unique: true,
    match: /^\d{13}$/
  },
  author: String,
  publication_date: Date,
  genre: String,
  price: Number
});

module.exports = mongoose.model('Book', bookSchema);