import { useState } from "react";
import styles from "./Question.module.css";
import { sendMessage } from "../../services/openrouter";

export default function Question() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    //ボタンを押したときに送る処理
    async function handleSubmit() {
        if (!message.trim()) return;

        setLoading(true);

        try {
            const result = await sendMessage(message);
            setReply(result);

            const history = JSON.parse(localStorage.getItem("history") ?? "[]");
            const now = new Date();

            history.unshift({
                id: Date.now(),
                date: now.toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }).replaceAll("/", "-"),
                menu: result.name,
                price: result.price,
            });
            
            localStorage.setItem("history", JSON.stringify(history));
            console.log(result);
        } catch (error) {
            console.error(error);
            setReply("エラーが発生しました。");
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <h1>今のお腹の気分を教えてください！</h1>

            {/* 左右に並べるためのラッパーを追加 */}
            <div className={styles.contentWrap}>
                
                {/* 左半分：入力エリアとボタン */}
                <div className={styles.leftSection}>
                    <textarea
                        className={styles.input}
                        placeholder="例：今日はガッツリしたものが食べたい"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        className={styles.button}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "送信中..." : "ぺこナビに相談"}
                    </button>
                </div>

                {/* 右半分：今日のおすすめ（結果） */}
                <div className={styles.result}>
                    <h2>🍽 今日のおすすめ</h2>
                    {reply && (
                        <>
                            <img
                                src={reply.image}
                                alt={reply.name}
                                width={250}
                            />
                            <h3>{reply.name}</h3>
                            <p>{reply.reason}</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}