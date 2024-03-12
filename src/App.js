import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import DonatePage from "./DonatePage/DonatePage";
import ReceivePage from "./ReceivePage/ReceivePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/receive" element={<ReceivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
