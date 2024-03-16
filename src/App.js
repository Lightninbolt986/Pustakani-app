import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ReceivePage from "./ReceivePage/ReceivePage";
import LoginPage from "./ProfilePage/LoginPage";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
     apiKey: process.env.REACT_APP_API_KEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_PROJECT_ID,
     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_APP_ID,
     measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
