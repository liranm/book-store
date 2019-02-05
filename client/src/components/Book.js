import React from 'react';

const Book = ({ title, description, isbn, author, publication_date, genre, price }) => {
    return (
        <div className="book">
            <h1>{title}</h1>
            <h2>{description}</h2>
            <p>{isbn}</p>
            <p>{author}</p>
            <p>{publication_date}</p>
            <p>{genre}</p>
            <p>{price}</p>
        </div>
    );
};

export default Book;