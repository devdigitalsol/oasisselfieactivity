import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppState } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer theme={"colored"} position="top-right" />
    <AppState>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AppState>
  </BrowserRouter>
);
