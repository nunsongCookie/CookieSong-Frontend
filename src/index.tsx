import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container!);
const JAVASCRIPT_KEY = import.meta.env.VITE_APP_JAVASCRIPT_KEY;

window.Kakao.init(JAVASCRIPT_KEY);
window.Kakao.isInitialized();

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
