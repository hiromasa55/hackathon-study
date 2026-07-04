// src/pages/History/HistoryFilter.jsx
import React from 'react';
import styles from './History.module.css';

const HistoryFilter = ({ selectedMonth, setSelectedMonth, isSortDesc, setIsSortDesc, setCurrentPage }) => {
  return (
    <div className={styles.header}>
      <div className={styles.filterWrapper}>
        <span className={styles.label}>表示月:</span>
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setCurrentPage(1); // 月を変更したら1ページ目に戻す
          }}
          className={styles.selectInput}
        >
          {/* 実際はデータから動的に生成するか、現在の月から数ヶ月前までを生成します */}
          <option value="2026-07">2026年7月</option>
          <option value="2026-06">2026年6月</option>
        </select>
        <button 
          onClick={() => setIsSortDesc(!isSortDesc)}
          className={styles.sortButton}
        >
          sort ({isSortDesc ? '最新順' : '古い順'})
        </button>
      </div>
    </div>
  );
};

export default HistoryFilter;