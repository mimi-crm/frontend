import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// React 18 방식으로 Root 생성
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
