import React from "react";
import "./ProfilePage.css";

function ProfilePage({ user, onLogout }) {
  return (
    <div className="profile-page-box">
      <h1>
        Guten tag, {user.name} {user.email}?
      </h1>
      <button onClick={onLogout} className="profile-page-logout-button">
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
