import React from 'react';

const Book = ({ title, description, isbn, author, publication_date, genre, price }) => {
    return (
        <div className="book">
            <label className="book__label">Title</label>
            <h1 className="book__title">{title}</h1>
            <label className="book__label">Description</label>
            <h2 className="book__subtitle">{description}</h2>
            <label className="book__label">ISBN</label>
            <p className="book__field">{isbn}</p>
            <label className="book__label">Author</label>
            <p className="book__field">{author}</p>
            <label className="book__label">Publication Date</label>
            <p className="book__field">{new Date(publication_date).toDateString()}</p>
            <label className="book__label">Genre</label>
            <p className="book__field">{genre}</p>
            <label className="book__label">Price</label>
            <p className="book__field">{price.toFixed(2)} $</p>
        </div>
    );
};

export default Book;