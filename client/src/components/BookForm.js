import React from 'react';
import classNames from 'classnames';

const BookForm = ({
    title,
    description,
    isbn,
    author,
    publicationDate,
    price,
    genre,
    showForm,
    handleSubmit,
    handleChange
}) => (
    <form
        onSubmit={handleSubmit}
        className={classNames({
            bookForm: true,
            show: showForm,
            hide: !showForm
        })}
    >
        <label className="bookForm__label">Title</label>
        <input
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
            className="bookForm__input"
        />

        <label className="bookForm__label">Description</label>
        <input
            type="text"
            value={description}
            onChange={handleChange}
            name="description"
            className="bookForm__input"
        />

        <label className="bookForm__label">ISBN</label>
        <input
            type="text"
            value={isbn}
            onChange={handleChange}
            name="isbn"
            className="bookForm__input"
        />

        <label className="bookForm__label">Author</label>
        <input
            type="text"
            value={author}
            onChange={handleChange}
            name="author"
            className="bookForm__input"
        />

        <label className="bookForm__label">Publication Date</label>
        <input
            type="date"
            value={publicationDate}
            onChange={handleChange}
            name="publicationDate"
            className="bookForm__input"
        />

        <label className="bookForm__label">Price</label>
        <input
            type="number"
            value={price}
            onChange={handleChange}
            name="price"
            className="bookForm__input"
        />

        <label className="bookForm__label">Genre</label>
        <select
            value={genre}
            onChange={handleChange}
            name="genre"
            className="bookForm__input"
        >
            <option value="">--Select--</option>
            <option value="science_fiction">Science fiction</option>
            <option value="satire">Satire</option>
            <option value="drama">Drama</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="mystery">Mystery</option>
            <option value="horror">Horror</option>
        </select>

        <button
            type="submit"
            className="bookForm__submit"
        >
            Submit
        </button>
    </form>
);

export default BookForm;