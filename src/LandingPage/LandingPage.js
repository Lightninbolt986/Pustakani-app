import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="button-box">
      <div>
        <button
          className="donate-button landing-button"
          onClick={function e() {
            window.location.href = "/#profile";
          }}
        >
          Donate Books
          <br />
          पुस्तकें दान
        </button>
      </div>
      <div>
        <button
          className="receive-button landing-button"
          onClick={function e() {
            window.location.href = "/#receive";
          }}
        >
          Receive Books
          <br />
          पुस्तकें प्राप्त
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
