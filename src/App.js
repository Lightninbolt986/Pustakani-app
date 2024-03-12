import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ReceivePage from "./ReceivePage/ReceivePage";
import LoginPage from "./ProfilePage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/receive" element={<ReceivePage />} />
        <Route path="/profile" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
