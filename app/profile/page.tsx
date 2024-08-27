"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Image from "next/image";


const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <div className = "h-screen w-screen flex flex-col justify-center items-center">
              <img src={user.photoURL} width="50"  height="50" alt="loading.." className="my-20" />
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page -
          a protected route.
        </p>
        </div>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </div>
  );
};

export default page;