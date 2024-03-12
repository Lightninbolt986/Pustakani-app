import React from "react";

function ProfilePage({ user, onLogout }) {
  return (
    <div>
      Guten tag, {user.name} {user.email}?
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
