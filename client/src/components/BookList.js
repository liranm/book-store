import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            books: [],
            chosenBook: null
        };
    }

    handleClick = (book, event) => {
        event.preventDefault();

        this.setState({
            chosenBook: book
        });
    }

    handleRemove = (event) => {
        this.removeBook(this.state.chosenBook);
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then((books) => {
                this.setState({ books });
            });
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
                {this.getBookLinks(this.state.books)}
                {this.state.chosenBook && <Book {...this.state.chosenBook} />}
                {this.state.chosenBook && 
                    <button
                        type="button"
                        onClick={this.handleRemove}
                    >
                        Remove book
                    </button>
                }
            </div>
        );
    }
}

export default BookList;