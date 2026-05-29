import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Metrics from "./pages/Metrics"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/metrics" element={<Metrics />} />
    </Routes>
  )
}

export default App
