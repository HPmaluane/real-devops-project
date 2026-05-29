import React from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import "./index.css"

import App from "./App"
import Metrics from "./pages/Metrics"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
)
