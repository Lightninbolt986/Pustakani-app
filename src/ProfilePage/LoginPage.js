import React, { useState } from "react";
import "./ProfilePage.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Profile from "./ProfilePage";
import { googleLogout } from "@react-oauth/google";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null);
    googleLogout();
  };
  if (user) {
    return <Profile user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="login-box">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
        <div className="login-text">
          Please sign in to continue <br />
          कृपया आगे बढ़ने के लिए साइन इन करें
        </div>
        <GoogleLogin
          auto_select
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            console.log(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
    </div>
  );
}
export default ProfilePage;
