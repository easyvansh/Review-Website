import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const SignUpForm = () => {
  const { googleSignIn } = UserAuth();
  const [skatingLevel, setSkatingLevel] = useState("beginner");

  const handleSignUp = async () => {
    try {
      await googleSignIn(skatingLevel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-form px-20">
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
  );
};

export default SignUpForm;
