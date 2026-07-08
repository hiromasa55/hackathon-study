export async function sendMessage(message, menus) {
    const API_URL = import.meta.env.DEV
        ? "http://localhost:3001"
        : "/api";

    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            menus,
        })
    });

    if (!response.ok) {
        throw new Error("サーバーとの通信に失敗しました。");
    }

    const data = await response.json();

    return data;
}