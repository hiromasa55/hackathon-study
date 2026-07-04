// src/pages/History/HistorySummary.jsx
import React from 'react';
import styles from './History.module.css';

const HistorySummary = ({ totalCount, totalAmount }) => {
  return (
    <div className={styles.fixedSummary}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>利用数:</span>
        <span className={styles.summaryValue}>{totalCount} 回</span>
      </div>
      <div className={styles.summaryLine}></div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>合計金額:</span>
        <span className={styles.summaryValue}>{totalAmount.toLocaleString()} 円</span>
      </div>
    </div>
  );
};

export default HistorySummary;