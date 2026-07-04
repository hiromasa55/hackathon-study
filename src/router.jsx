// src/router.jsx
import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Question from "./pages/Question/Question";
import Menu from "./pages/Menu";
import History from "./pages/History";
import Option from "./pages/Option";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,      // 共通レイアウト
    children: [
      {
        index: true,
        element: <Question />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "option",
        element: <Option />,
      },
    ],
  },
]);