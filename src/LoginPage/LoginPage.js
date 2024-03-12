import React from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function LoginPage() {
  return (
    <GoogleOAuthProvider clientId="46186689711-u7rf9dc5jn1lqjgu18ca9r926fchdje4.apps.googleusercontent.com">
      <div>hello</div>
      <GoogleLogin
        auto_select
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);

          console.log(decoded);
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
