"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
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
      // Add the review to the reviews subcollection
      const reviewRef = collection(db, `entities/${entityId}/reviews`);
      await addDoc(reviewRef, {
        userName: user.displayName,
        userId: user.uid,
        userIcon: user.photoURL,
        userLevel: userDoc.level,
        rating,
        reviewText,
        createdAt: serverTimestamp(),
      });

      // Fetch all reviews to calculate the new average rating and increment review count
      const reviewsSnapshot = await getDocs(reviewRef);
      const reviewCount = reviewsSnapshot.size;

      let totalRating = 0;
      reviewsSnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
      });

      const avgRating = totalRating / reviewCount;

      // Update the entity document with the new review count and average rating
      const entityDocRef = doc(db, "entities", entityId);
      await updateDoc(entityDocRef, {
        reviewCount,
        avgRating,
      });

      console.log("Review added and entity updated successfully");

      // Reset form
      setRating(0);
      setReviewText("");
      setError("");
    } catch (e) {
      console.error("Error adding review:", e);
      setError("Failed to add review.");
    }
  };

  return (
    <div className="flex flex-col ">
      <h3 className="text-xl mb-2">Add Review</h3>
      <div className="flex flex-row  items-start py-4">
        <label htmlFor="userName" className="text-lg">
          Writing As:
        </label>
        <p className="mx-10 items-center text-lg">{user?.displayName}</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="rating" className="text-lg ">
          Rating (1 to 10):
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="bg-white bg-opacity-15 mx-10 px-10  items-center justify-center "
        />
        <label htmlFor="rating" className=" text-lg ">
          Review:
        </label>
        <textarea
          className="bg-white bg-opacity-15 mx-10 px-10  items-start justify-center "
          placeholder="Write Review"
          required
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button
          className="bg-slate-200 bg-opacity-5 p-5 rounded-lg items-center justify-center flex flex-col"
          onClick={handleAddReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
