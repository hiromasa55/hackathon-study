// src/pages/History/HistoryList.jsx
import React from 'react';
import styles from './History.module.css';

// 日付表示のフォーマット関数
const formatDateLabel = (dateStr) => {
  const date = new Date(dateStr.replace(/-/g, '/'));
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${month}/${day}(${dayOfWeek}) ${hours}:${minutes}`;
};

const HistoryList = ({ items }) => {
  return (
    <div className={styles.listContainer}>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className={styles.listItem}>
            <span>{formatDateLabel(item.date)} <b>{item.menu}</b> を食べました</span>
            <span className={styles.arrow}>{'>'}</span>
          </div>
        ))
      ) : (
        <p className={styles.emptyText}>選択された月の履歴はありません。</p>
      )}
    </div>
  );
};

export default HistoryList;