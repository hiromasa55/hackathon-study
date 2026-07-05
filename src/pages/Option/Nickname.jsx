import { useState, useEffect } from "react";
import styles from "./Nickname.module.css";

export default function Nickname({ onBack }) {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setNickname(profile.nickname || "");
    }
  }, []);

  const handleSave = () => {
    const savedProfile = localStorage.getItem("profile");
    const profile = savedProfile ? JSON.parse(savedProfile) : {};

    profile.nickname = nickname;

    localStorage.setItem("profile", JSON.stringify(profile));
    window.dispatchEvent(new Event("storage"));

    alert("ニックネームを変更しました！");
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
