import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5; // Максимальное количество отображаемых страниц

  const [startPage, setStartPage] = useState(1);

  const handlePageChange = pageNumber => {
    onPageChange(pageNumber);
    setStartPage(Math.max(1, pageNumber - Math.floor(MAX_VISIBLE_PAGES / 2)));
  };

  const pageNumbers = [];
  for (let i = startPage; i <= Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul style={{display:'flex', gap: '6px'}}>
      {startPage > 1 && (
        <li>
          <a href="#" onClick={() => setStartPage(startPage - 1)}>Пред</a>
        </li>
      )}
      {pageNumbers.map(number => (
        <li key={number} className={currentPage === number ? 'active' : ''}>
          <a href="#" onClick={() => handlePageChange(number)}>{number}</a>
        </li>
      ))}
      {startPage + MAX_VISIBLE_PAGES - 1 < totalPages && (
        <li>
          <a href="#" onClick={() => setStartPage(startPage + 1)}>След</a>
        </li>
      )}
    </ul>
  );
};

export default Pagination;