import React, { Component } from 'react';
import classNames from 'classnames';

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
            price: '',
            showMessage: false
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
        event.preventDefault();

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

        const message = await res.text();

        this.setState({
            message,
            showMessage: true
        });

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

        setTimeout(() => this.setState({ showMessage: false }), 3000);
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

        const message = await res.text();

        this.setState({
            message,
            showMessage: true
        });

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

        setTimeout(() => this.setState({ showMessage: false }), 3000);
    }

    getBookLinks(books) {
        const bookLinks = books.map(book => (
            <li
                key={book.isbn}
                className="bookList__item"
            >
                <a
                    onClick={(event) => this.handleRemove(event, book)}
                    href="remove"
                    className="bookList__remove-item"
                >
                    x
                </a>
                <a
                    onClick={this.handleClick.bind(this, book)}
                    href={book.isbn}
                    className="bookList__title"
                >
                    {book.title}
                </a>
            </li>
        ));

        return (
            <ul className="bookList">
                <li>
                    <a
                        href="add"
                        onClick={this.handleAdd}
                        className="bookList__add-item"
                    >
                        Add book
                    </a>
                </li>
                {bookLinks}
            </ul>
        );
    }

    render() {
        return (
            <div className="bookStore">
                <p
                    className={classNames({
                        bookStore__message: true,
                        show: this.state.showMessage,
                        hide: !this.state.showMessage
                    })}
                >
                    {this.state.message}
                </p>
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