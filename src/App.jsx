import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./router";

export default function App() {

    useEffect(() => {
        const savedColor = localStorage.getItem("baseColor");

        if (savedColor) {
            document.body.style.backgroundColor = savedColor;
        }

        const savedFontSize = localStorage.getItem("fontSize");

        if (savedFontSize) {
            document.documentElement.style.fontSize = `${savedFontSize}px`;
        }
    }, []);

    return <RouterProvider router={router} />;
}