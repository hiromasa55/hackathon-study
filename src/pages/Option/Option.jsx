import { useState } from "react";
import styles from "./Option.module.css";
import Profile from "./Profile";
import Nickname from "./Nickname";
import FontSize from "./FontSize";
import Color from "./Color";

export default function Option() {
  const [page, setPage] = useState("option");

  if (page === "profile") {
    return <Profile onBack={() => setPage("option")} />;
  }
  if (page === "nickname") {
    return <Nickname onBack={() => setPage("option")} />;
  }
  if (page === "fontsize") {
    return <FontSize onBack={() => setPage("option")} />;
  }
  if (page === "color") {
    return <Color onBack={() => setPage("option")} />;
  }
  return (
    <div className={styles.container}>
      <button className={styles.profile} onClick={() => setPage("profile")}>
        プロフィール <br />
        氏名・学生番号
      </button>

      <button className={styles.button} onClick={() => setPage("nickname")}>
        ニックネーム変更
      </button>

      <button className={styles.button} onClick={() => setPage("fontsize")}>
        文字の大きさ
      </button>

      <button className={styles.button} onClick={() => setPage("color")}>
        ベースカラー変更
      </button>
    </div>
  );
}
