"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
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
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUserDoc(userDocSnap.data());
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

  if (!user) return <p>You must be logged in to view this page - protected route.</p>;

  return (
    <div className="p-4 h-screen w-screen flex flex-col justify-center items-center">
      {user.photoURL && (
        <Image
          src={user.photoURL}
          width={50}
          height={50}
          alt="User profile"
          className="my-20"
        />
      )}
      <p>
        Welcome, {user.displayName?.split(" ")[0] || "User"} - you are logged in to the
        profile page - a protected route.
      </p>
      <br />
      {userDoc && userDoc.level && (
        <p>Your Skating Level is {userDoc.level}</p>
      )}
    </div>
  );
};

export default UserProfile;