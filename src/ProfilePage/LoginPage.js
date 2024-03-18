import React, { useState } from "react";
import "./ProfilePage.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Profile from "./ProfilePage";
import { googleLogout } from "@react-oauth/google";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "../firestore";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null);
    googleLogout();
    secureLocalStorage.removeItem("userToken");
  };

  useEffect(() => {
    let userToken = secureLocalStorage.getItem("userToken");
    if (userToken) {
      if (!user) {
        console.log("a");
        const db = getFirestore(app);
        const docRef = doc(db, "users", userToken);
        getDoc(docRef).then((doc) => {
            if (doc.exists) {
              setUser(doc.data());
              console.log("Document data:", doc.data());
            } else {
              console.log("No such document!");
            }
                    });
      }
    }
  });
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
                secureLocalStorage.setItem("userToken", doc.id);
                setUser(doc.data());
              });
            } else {
              addDoc(userCollection, {
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture,
                books: [],
              })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                  setUser(doc.data());
                  secureLocalStorage.setItem("userToken", docRef.id);
                })
                .catch((e) => {
                  console.error(e);
                });
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          
        />
      </GoogleOAuthProvider>
    </div>
  );
}
export default ProfilePage;
