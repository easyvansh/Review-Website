"use client";

import { useState } from "react";
import AddReview from "../components/AddReview";
import ListReviews from "../components/ListReviews";

export default function Review() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const handleAddReview = () => {
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview(""); // Clear the input after adding the review
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between font-mono py-10 px-10">
      <div>
        <h1 className="text-2xl text-pretty">Club / Coach / Ice Rink</h1>
        <div>
          <a href="/">Back</a>
        </div>
        <div className=" max-w-6xl items-center  h-[46vh]   my-5">
          <h1> Summary</h1>
          <div className="  items-center h-[40vh] relative p-4">
            Summary of Rink/Club/Coach - Lorem Ipsum Summary of Rink/Club/Coach
            - Lorem Ipsum Summary of Rink/Club/Coach - Lorem Ipsum Summary of
            Rink/Club/Coach - Lorem Ipsum Summary of Rink/Club/Coach - Lorem
            Ipsum Summary of Rink/Club/Coach - Lorem Ipsum Summary of
            Rink/Club/Coach - Lorem Ipsum Summary of Rink/Club/Coach - Lorem
            IpsumSummary of Rink/Club/Coach - Lorem Ipsum Summary of
            Rink/Club/Coach - Lorem Ipsum Summary of Rink/Club/Coach - Lorem
            Ipsum Summary of Rink/Club/Coach - Lorem Ipsum Summary
            Rink/Club/Coach - Lorem Ipsum Summary of Rink/Club/Coach - Lorem
            Ipsum Summary of Rink/Club/Coach - Lorem Ipsum Summary
            <div className="absolute">
              <AddReview />
            </div>
          </div>
          <div className="z-10 w-full max-w-5xl mt-10 h-[36vh] absolute  p-4">
            <ListReviews/>
            
          </div>
        </div>
      </div>
    </main>
  );
}
