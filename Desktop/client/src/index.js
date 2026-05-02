import React from "react";
import ReactDOM from "react-dom/client"; // ✅ changed
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // ✅ new
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}