import { useState, useEffect } from "react";
import styles from "./FontSize.module.css";

export default function FontSize({ onBack }) {
  const [fontSize, setFontSize] = useState("16");

  // 起動時に保存されている文字サイズを読み込む
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedFontSize) {
      setFontSize(savedFontSize);
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
  }, []);

  // 保存
  const handleSave = () => {
    localStorage.setItem("fontSize", fontSize);

    // アプリ全体の文字サイズを変更
    document.documentElement.style.fontSize = `${fontSize}px`;

    alert("文字サイズを変更しました！");
  };

  return (
    <div className={styles.container}>
      <h1>文字の大きさ変更</h1>

      <div className={styles.card}>
        <label>文字サイズ</label>

        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="14">小（14px）</option>
          <option value="16">標準（16px）</option>
          <option value="18">大（18px）</option>
          <option value="20">特大（20px）</option>
        </select>

        <button onClick={handleSave}>変更</button>

        <button onClick={onBack}>戻る</button>
      </div>
    </div>
  );
}
