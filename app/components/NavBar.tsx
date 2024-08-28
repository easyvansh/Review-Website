import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const { user, logout } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false); // Track if the user is signing up
  const router = useRouter();

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
            <li
              className="p-2 cursor-pointer"
              onClick={() => setIsSigningUp(false)}
            >
              Login
            </li>
            <li className="p-2 cursor-pointer" onClick={() => router.push("/signup")}>
            Sign Up
          </li>
        </ul>
      ) : (
        <div>
          <ul className="flex">
            <li className="p-2">
              <p>Welcome, {user.displayName.split(" ")[0]}</p>
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
