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

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then((books) => {
                this.setState({ books });
            });
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
            </div>
        );
    }
}

export default BookList;