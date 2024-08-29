"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext"; // Ensure this import path is correct
import { collection, addDoc, serverTimestamp, getDocs, where, query } from "firebase/firestore";
import db from "@/utils/firestore";

const AddReview = ({ entityId }) => {
  const { user } = UserAuth(); // Destructure user from UserAuth
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
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
    };

    fetchUserData();
  }, [user]);

  const handleAddReview = async () => {
    if (!user) {
      setError("You must be logged in to add a review.");
      return;
    }

    if (rating <= 0 || reviewText.trim() === "") {
      setError("Please provide a rating and review text.");
      return;
    }

    try {
      const reviewRef = collection(db, `entities/${entityId}/reviews`);
      console.log(user);
      await addDoc(reviewRef, {
        userName: user.displayName,
        userId: user.uid,
        userIcon: user.photoURL,
        userLevel: userDoc.level,
        rating,
        reviewText,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", reviewRef.id);
      setRating(0);
      setReviewText("");
      setError("");
    } catch (e) {
      console.error("Error adding review:", e);
      setError("Failed to add review.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3>Add Review</h3>
      <div className="flex flex-row  justify-center items-start py-10">
        <label htmlFor="userName">Writing As:</label>

        <p className="mx-10  items-center ">{user.userName}</p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="rating">Rating (1 to 10):</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value, 10))}
            className="bg-white bg-opacity-15 mx-10 px-10 py-5 items-center justify-center flex"
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            className="bg-white bg-opacity-15  mx-10 px-10 py-5 items-center justify-center flex"
            placeholder="Write Review"
            required
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <button
          className="bg-teal-300 bg-opacity-5  p-5 rounded-lg items-center justify-center flex flex-col"
          onClick={handleAddReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
