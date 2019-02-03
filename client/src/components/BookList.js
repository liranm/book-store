import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then((books) => {
                this.setState({ books });
            });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.books.map(book => 
                        <Book key={book.isbn} {...book} />
                    )}
                </ul>
            </div>
        );
    }
}

export default BookList;