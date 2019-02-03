const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/Book');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true});

const book = new Book({
    title: 'The book',
    description: 'Some book blablabla',
    isbn: '1233456471',
    author: 'Liran',
    publication_data: '2018-12-04',
    genre: 'Horrow',
    price: 45.5
});

book.save().then(() => console.log('new book created'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));