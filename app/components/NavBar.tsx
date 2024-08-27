import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, googleSignIn, logout } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  console.log(user);
  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>

        <li className="p-2 cursor-pointer">
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
      {loading ? null : !user ? (
          <ul className="flex">
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              Login
            </li>
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              Sign Up
            </li>
          </ul>
      ) : (
        <div>
          <ul className="flex">
            <li className="p-2">
              <p>Welcome,{user.displayName.split(" ")[0]}</p>
            </li>
            <li className="p-2 cursor-pointer" onClick={handleSignOut}>
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
