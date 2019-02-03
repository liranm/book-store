const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/Book');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true});

app.get('/', async (req, res) => {
    const books = await Book.find();

    res.json(books);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));