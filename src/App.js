import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ReceivePage from "./ReceivePage/ReceivePage";
import LoginPage from "./ProfilePage/LoginPage";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAc3WqEWxYhUpcui-9y3Qk1j-oWeo4D9xM",
    authDomain: "pustakani-ac394.firebaseapp.com",
    projectId: "pustakani-ac394",
    storageBucket: "pustakani-ac394.appspot.com",
    messagingSenderId: "850561426965",
    appId: "1:850561426965:web:dbf081676caaaa30e4d01c",
    measurementId: "G-EEMF2RC8Z3",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
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
