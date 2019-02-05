import React, { Component } from 'react';

class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            isbn: '',
            author: '',
            publicationDate: '',
            genre: '',
            price: ''
        };
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.addBook(this.state);
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={this.handleChange} name="title" />

                    <label>Description</label>
                    <input type="text" value={this.state.description} onChange={this.handleChange} name="description" />

                    <label>ISBN</label>
                    <input type="text" value={this.state.isbn} onChange={this.handleChange} name="isbn" />

                    <label>Author</label>
                    <input type="text" value={this.state.author} onChange={this.handleChange} name="author" />

                    <label>Publication Date</label>
                    <input type="date" value={this.state.publicationDate} onChange={this.handleChange} name="publicationDate" />

                    <label>Genre</label>
                    <select value={this.state.genre} onChange={this.handleChange} name="genre">
                        <option value="">--Select--</option>
                        <option value="science_fiction">Science fiction</option>
                        <option value="satire">Satire</option>
                        <option value="drama">Drama</option>
                        <option value="action">Action</option>
                        <option value="romance">Romance</option>
                        <option value="mystery">Mystery</option>
                        <option value="horror">Horror</option>
                    </select>

                    <label>Price</label>
                    <input type="number" value={this.state.price} onChange={this.handleChange} name="price" />

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default BookForm;