import React, { useState } from "react";
import "./ProfilePage.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Profile from "./ProfilePage";
import { googleLogout } from "@react-oauth/google";

import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import app from "../firestore";

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
          onSuccess={async (credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            const db = getFirestore(app);
            const userCollection = collection(db, "users");
            const quer = query(
              userCollection,
              where("email", "==", decoded.email)
            );
            const querySnapshot = await getDocs(quer);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                console.log("User exists with ID: ", doc.id);
              });
            } else {
              addDoc(userCollection, {
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture,
              })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((e) => {
                  console.error(e);
                });
            }
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
