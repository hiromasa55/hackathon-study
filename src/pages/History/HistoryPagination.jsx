// src/pages/History/HistoryPagination.jsx
import React from 'react';
import styles from './History.module.css';

const HistoryPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${styles.pageButton} ${
              currentPage === pageNumber ? styles.activePage : styles.inactivePage
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default HistoryPagination;