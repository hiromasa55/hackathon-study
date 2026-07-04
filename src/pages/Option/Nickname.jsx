import { useState } from "react";
import styles from "./Nickname.module.css";

export default function Nickname({ onBack }) {
  const [nickname, setNickname] = useState("");

  const handleSave = () => {
    alert(`ニックネームを変更しました！\nニックネーム：${nickname}`);
  };

  return (
    <div className={styles.container}>
      <h1>ニックネーム変更</h1>

      <div className={styles.card}>
        <label>新しいニックネーム</label>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <button onClick={handleSave}>変更</button>
        <button onClick={onBack}>戻る</button>
      </div>
    </div>
  );
}
