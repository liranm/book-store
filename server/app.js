const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Book = require('./models/Book');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/books', {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const books = await Book.find();

    res.json(books);
});

app.post('/add', async (req, res) => {
    const { title, description, isbn, author, publication_date, genre, price } = req.body;

    try {
        await Book.create({ title, description, isbn, author, publication_date, genre, price });
    } catch(err) {
        return res.status(400).send(err.message);
    }

    res.send('Book added!');
});

app.delete('/remove', async (req, res) => {
    const { isbn } = req.body;

    try {
        await Book.deleteOne({ isbn });
    } catch(err) {
        return res.status(400).send(err.message);
    }

    res.send('Book removed!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));