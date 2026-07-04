// src/pages/History/History.jsx
import React, { useState, useMemo } from 'react';
import styles from './History.module.css';

// 子コンポーネントのインポート
import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList';
import HistoryPagination from './HistoryPagination';
import HistorySummary from './HistorySummary';

// ① Historyファイル側に持たせるモックデータ（データがない場合のフォールバック用）
const defaultMockData = [
  { id: 1, date: '2026-07-04 12:30', menu: 'カツカレー', price: 450 },
  { id: 2, date: '2026-07-03 12:00', menu: '醤油ラーメン', price: 380 },
  { id: 3, date: '2026-07-02 12:45', menu: '日替わり定食', price: 500 },
  { id: 4, date: '2026-07-01 13:00', menu: 'きつねうどん', price: 320 },
  { id: 5, date: '2026-06-28 12:15', menu: '豚丼', price: 420 },
  { id: 6, date: '2026-06-25 12:00', menu: '唐揚げ定食', price: 500 },
  { id: 7, date: '2026-06-20 12:30', menu: 'カツカレー', price: 450 },
];

// ② 引数部分で、historyData が渡されなかったり、空の配列だった場合の安全策を入れます
const History = ({ historyData }) => {
  // State管理
  const [selectedMonth, setSelectedMonth] = useState('2026-07');
  const [isSortDesc, setIsSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // データの絞り込みとソート
  const filteredData = useMemo(() => {
    // 親から有効な配列（要素あり）が渡ってくればそれを使い、
    // 未定義(undefined)や空配列([])なら、このファイル内の defaultMockData を使う
    const dataToProcess = (historyData && historyData.length > 0) 
      ? historyData 
      : defaultMockData;

    let data = [...dataToProcess].filter((item) =>
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