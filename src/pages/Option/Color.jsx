import { useState } from "react";
import styles from "./Color.module.css";

export default function Color({ onBack }) {
  const [color, setColor] = useState("#ffffff");

  const handleSave = () => {
    document.body.style.backgroundColor = color;
    alert("ベースカラーを変更しました！");
  };

  return (
    <div className={styles.container}>
      <h1>ベースカラー変更</h1>

      <div className={styles.card}>
        <label>ベースカラーを選択</label>

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
