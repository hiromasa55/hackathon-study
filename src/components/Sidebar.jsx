import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside
            style={{
                width: "220px",
                background: "#f5f5f5",
                padding: "20px",
                borderRight: "1px solid #ddd",
            }}
        >
            <h2>Hackathon</h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "20px",
                }}
            >
                <NavLink to="/">質問</NavLink>
                <NavLink to="/menu">メニュー一覧</NavLink>
                <NavLink to="/history">履歴</NavLink>
                <NavLink to="/option">オプション</NavLink>
            </nav>
        </aside>
    );
}