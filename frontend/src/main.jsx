import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"; // Bu satır, yazdığımız tüm tasarım kodlarını aktif eder.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
