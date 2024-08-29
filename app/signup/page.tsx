"use client"

import React, {useState} from 'react'
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const { googleSignIn } = UserAuth();
    const [skatingLevel, setSkatingLevel] = useState("beginner");
    const router = useRouter();

    const handleSignUp = async () => {
      try {
        await googleSignIn(skatingLevel);
        router.push('/profile');
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="signup-form px-20 h-screen w-auto flex flex-col justify-center items-center">
      <div className = "flex flex-col gap-24">
        <label htmlFor="skatingLevel">Select your skating level:</label>
        <select
          id="skatingLevel"
          value={skatingLevel}
          onChange={(e) => setSkatingLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
        </select>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      </div>
    );
  };

export default SignUp