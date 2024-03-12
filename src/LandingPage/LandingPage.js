import React from "react";

function LandingPage() {
  return (
    <div>
      <div>
        <button
          onClick={function e() {
            window.location.href = "/login";
          }}
        >
          Donate Books
        </button>
      </div>
      <div>
        <button
          onClick={function e() {
            window.location.href = "/receive";
          }}
        >
          Receive Books
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
