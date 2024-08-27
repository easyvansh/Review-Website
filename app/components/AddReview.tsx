import React, { useState, useEffect } from "react";
import db from "@/utils/firestore.js";
import { collection, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const AddReview = () => {
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const { user, googleSignIn, } = UserAuth();

  const [loading, setLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        review,
        userName: user.displayName,
        userId: user.uid,
        created: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      setReview(" ");
      setUserName("");
      setUserId("");
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
