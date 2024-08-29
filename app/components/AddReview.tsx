import React, { useState, useEffect } from "react";
import db from "@/utils/firestore.js";
import { collection, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const AddReview = () => {
  const { user, googleSignIn } = UserAuth();
  const [userId, setUserId] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [userName, setUserName] = useState("");
  const [type,setType] = useState("");
  const [userLevel, setUserLevel] = useState("beginner");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(true);

  // Reviews Database - Icon - Name (Level) - Rating - Date - Review Text
  // entities/{entityId}/reviews: {
  //   reviewId: {
  //     userId: string, // Reference to user document
  //     rating: number,
  //     reviewText: string,
  //     createdAt: timestamp
  //   }
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        review,
        userName: user.displayName,
        userId: user.uid,
        userIcon: user.photoURL,
        userLevel,
        rating,
        created: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setReview(" ");
      setUserName("");
      setUserId("");
      setUserIcon("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleSubmitwithoutSignIn = async (event) => {
    event.preventDefault();

    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
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
    <div className="relative">
      {loading ? null : !user ? (
        <div>
          <h2>Add Review</h2>
          <form onSubmit={handleSubmitwithoutSignIn}>
            <div className="flex flex-row  justify-center items-start py-10">
              <label htmlFor="userName">User Name:</label>
              <p className="mx-10  items-center justify-center flex flex-col">
                Please SIGN IN
              </p>

              <button
                type="submit"
                className="bg-teal-300 bg-opacity-5  p-5 rounded-lg items-center justify-center flex flex-col"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>Add Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row  justify-center items-start py-10">
              <label htmlFor="userName">Writing As:</label>

              <p className="mx-10  items-center ">{user.displayName}</p>

              <label htmlFor="userLevel">Level:</label>
              <select
                id="userLevel"
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
                required
                className="bg-white bg-opacity-15 mx-10 px-10 py-5 items-center justify-center flex"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="professional">Professional</option>
              </select>

              <label htmlFor="rating">Rating (1 to 10):</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                min="1"
                max="10"
                required
                className="bg-white bg-opacity-15 mx-10 px-10 py-5 items-center justify-center flex"
              />

              <label htmlFor="review">Review:</label>
              <textarea
                className="bg-white bg-opacity-15  mx-10 px-10 py-5 items-center justify-center flex"
                id="review"
                value={review}
                placeholder="Write Review"
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-teal-300 bg-opacity-5  p-5 rounded-lg items-center justify-center flex flex-col"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddReview;
