import { useState } from "react";
import styles from "./Question.module.css";
import { sendMessage } from "../../services/openrouter";

export default function Question() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!message.trim()) return;

        setLoading(true);

        try {
            const result = await sendMessage(message);
            setReply(result);
        } catch (error) {
            console.error(error);
            setReply("エラーが発生しました。");
        }

        setLoading(false);
    }

    return (
        <div className={styles.container}>
            <h1>今の腹の気分を教えてください！</h1>

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
                {loading ? "送信中..." : "AIに相談"}
            </button>

            <div className={styles.result}>
                <h2>AIからの提案</h2>
                <p>{reply}</p>
            </div>
        </div>
    );
}