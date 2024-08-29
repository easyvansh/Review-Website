"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/utils/firestore";

const UserProfile = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (user && user.uid) {
        try {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Assuming there is only one document for the user
            const userData = querySnapshot.docs[0].data();
            setUserDoc(userData);
            console.log(userData);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) return <Spinner />;

  if (!user)
    return <p>You must be logged in to view this page - protected route.</p>;

  return (
    <div className="p-4 h-screen w-screen flex flex-col  items-center">
      {user.photoURL && (
        <img
          src={user.photoURL}
          width={150}
          height={150}
          alt="User profile"
          className="my-20 rounded-3xl"
        />
      )}
      <p>
        Welcome, {user.displayName?.split(" ")[0] || "User"} - you are logged in
        to the profile page - a protected route.
      </p>
      <br />
      {userDoc && (
        <>
          <p>Your Skating Level is {userDoc.level}</p>
          <p>Your Email is {userDoc.email}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
