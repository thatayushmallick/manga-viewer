import React, { useEffect, useState } from 'react';
import { getBooks } from '../api';
import './BookList.css';

const BookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="book-list-container">
      {books.map((book) => (
        <button key={book.id} onClick={() => onSelectBook(book.id)}>
          {book.title}
        </button>
      ))}
    </div>
  );
};

export default BookList;
