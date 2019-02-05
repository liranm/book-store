import React, { Component } from 'react';

import Book from './Book';
import BookForm from './BookForm';

class BookList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            books: [],
            chosenBook: null,
            showForm: false,
            title: '',
            description: '',
            isbn: '',
            author: '',
            publicationDate: '',
            genre: '',
            price: ''
        };
    }

    handleClick = (book, event) => {
        event.preventDefault();

        this.setState({
            chosenBook: book,
            showForm: false
        });
    }

    handleRemove(event, book) {
        event.preventDefault();

        this.removeBook(book);
    }

    handleAdd = (event) => {
        this.setState({
            showForm: true,
            chosenBook: null
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.addBook(this.state);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then((books) => {
                this.setState({ books });
            });
    }

    async addBook({ title, description, isbn, author, publicationDate, genre, price }) {
        const res = await fetch(
            'http://localhost:3000/add',
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({ title, description, isbn, author, publication_date: publicationDate, genre, price })
            }
        );

        if(res.status === 200) {
            this.setState({
                title: '',
                description: '',
                isbn: '',
                author: '',
                publicationDate: '',
                genre: '',
                price: ''
            });
        }
    }

    async removeBook(book) {
        const { isbn } = book;

        const res = await fetch(
            'http://localhost:3000/remove',
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'DELETE',
                body: JSON.stringify({ isbn })
            }
        );

        if(res.status === 200) {
            const removedBookIndex = this.state.books.indexOf(book);

            this.setState({
                books: [
                    ...this.state.books.slice(0, removedBookIndex),
                    ...this.state.books.slice(removedBookIndex +1)
                ],
                chosenBook: null
            });
        }
    }

    getBookLinks(books) {
        const bookLinks = books.map(book => (
            <li key={book.isbn}>
                <a
                    onClick={(event) => this.handleRemove(event, book)}
                    href="remove"
                >
                    x
                </a>
                <a
                    onClick={this.handleClick.bind(this, book)}
                    href={book.isbn}
                >
                    {book.title}
                </a>
            </li>
        ));

        return (
            <ul>
                {bookLinks}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <button
                    type="button"
                    onClick={this.handleAdd}
                >
                    Add book
                </button>
                {this.getBookLinks(this.state.books)}
                {this.state.chosenBook && <Book {...this.state.chosenBook} />}
                <BookForm
                    { ...this.state }
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}

export default BookList;