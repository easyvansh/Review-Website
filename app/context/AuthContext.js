import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "@/utils/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "@/utils/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async (skatingLevel) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const loggedInUser = result.user;

    // Check if user exists in db
    const userDoc = await getDoc(doc(db, "users", loggedInUser.uid));
    if (!userDoc.exists()) {
      // If user doesn't exist, add to db
      await setDoc(doc(db, "users", loggedInUser.uid), {
        uid: loggedInUser.uid,
        displayName: loggedInUser.displayName,
        email: loggedInUser.email,
        level:skatingLevel,
        createdAt: new Date(),
      });
    }

    setUser(loggedInUser);
  };


  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
    })
    return () => unsubscribe()
  },[user])

  return (
    <AuthContext.Provider value={{ user,googleSignIn,logout }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
