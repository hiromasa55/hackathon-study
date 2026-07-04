// src/pages/History/History.jsx
import React, { useState, useMemo } from 'react';
import styles from './History.module.css';

// 子コンポーネントのインポート
import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList';
import HistoryPagination from './HistoryPagination';
import HistorySummary from './HistorySummary';

// App.jsx (またはルーター) から historyData を受け取る
const History = ({ historyData = [] }) => {
  // State管理
  const [selectedMonth, setSelectedMonth] = useState('2026-07');
  const [isSortDesc, setIsSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // データの絞り込みとソート
  const filteredData = useMemo(() => {
    let data = [...historyData].filter((item) =>
      item.date.startsWith(selectedMonth)
    );

    data.sort((a, b) => {
      return isSortDesc
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });

    return data;
  }, [historyData, selectedMonth, isSortDesc]);

  // 利用数と合計金額の計算
  const totalCount = filteredData.length;
  const totalAmount = useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.price, 0);
  }, [filteredData]);

  // ページネーション用の切り出し
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.mainContent}>
      
      <HistoryFilter 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        isSortDesc={isSortDesc}
        setIsSortDesc={setIsSortDesc}
        setCurrentPage={setCurrentPage}
      />

      <div className={styles.scrollableArea}>
        <HistoryList items={currentItems} />

        {totalPages > 1 && (
          <HistoryPagination 
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      <HistorySummary 
        totalCount={totalCount} 
        totalAmount={totalAmount} 
      />

    </div>
  );
};

export default History;