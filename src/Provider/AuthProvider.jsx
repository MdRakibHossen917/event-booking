import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/Firebase.Config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // **নতুন** — ইউজার লগইন হওয়ার পর MongoDB তে ইউজার ডেটা সেভ করার জন্য fetch
      if (currentUser?.email) {
        fetch(" https://event-booking-server-wheat.vercel.app/save-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser.email,
            name: currentUser.displayName,
            photo: currentUser.photoURL,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log("✅ User saved to DB:", data))
          .catch((err) => console.error("❌ Save user error:", err));
      }
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
