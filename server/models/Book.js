const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  isbn: String,
  author: String,
  publication_data: Date,
  genre: String,
  price: Number
});

module.exports = mongoose.model('Book', bookSchema);