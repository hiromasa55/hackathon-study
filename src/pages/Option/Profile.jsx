import { useState, useEffect } from "react";
import styles from "./Profile.module.css";

export default function Profile({ onBack }) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSave = () => {
    const profile = {
      name,
      studentId,
      nickname,
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("登録しました！");
  };
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);

      setName(profile.name || "");
      setStudentId(profile.studentId || "");
      setNickname(profile.nickname || "");
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1>プロフィール登録</h1>

      <div className={styles.card}>
        <label>氏名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>学生番号</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <label>ニックネーム</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <button onClick={handleSave}>登録</button>

        <button onClick={onBack}>戻る</button>
      </div>
    </div>
  );
}
