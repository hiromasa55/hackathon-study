import { useState, useEffect } from "react";
import styles from "./Color.module.css";

export default function Color({ onBack }) {
  const [color, setColor] = useState("#ffffff");

  // 起動時に保存されている色を読み込む
  useEffect(() => {
    const savedColor = localStorage.getItem("baseColor");

    if (savedColor) {
      setColor(savedColor);
      document.body.style.backgroundColor = savedColor;
    }
  }, []);

  // 保存
  const handleSave = () => {
    localStorage.setItem("baseColor", color);

    // 背景色を変更
    document.body.style.backgroundColor = color;

    alert("ベースカラーを変更しました！");
  };

  return (
    <div className={styles.container}>
      <h1>ベースカラー変更</h1>

      <div className={styles.card}>
        <label>ベースカラー</label>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button onClick={handleSave}>変更</button>

        <button onClick={onBack}>戻る</button>
      </div>
    </div>
  );
}
