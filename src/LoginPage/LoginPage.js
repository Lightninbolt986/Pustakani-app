import React, { useState } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ProfilePage from "../ProfilePage/ProfilePage";

function LoginPage() {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null);
  };
  if (user) {
    return <ProfilePage user={user} onLogout={handleLogout} />;
  }

  return (
    <GoogleOAuthProvider clientId="46186689711-u7rf9dc5jn1lqjgu18ca9r926fchdje4.apps.googleusercontent.com">
      <div>hello</div>
      <GoogleLogin
        auto_select
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          setUser(decoded);
          //AHA USER DATA
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}
export default LoginPage;
