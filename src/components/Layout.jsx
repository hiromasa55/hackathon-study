import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Layout() {
  useEffect(() => {
    // ベースカラーを適用
    const savedColor = localStorage.getItem("baseColor");
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
    }

    // 文字サイズを適用
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
