"use client";

import { useState } from "react";



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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl text-pretty text-cyan-300">Club / Coach / Ice Rink</h1>
        <div>
          <a href="/">Back</a>
        </div>
        <div className="z-10 w-full max-w-5xl items-center mt-80 h-[26vh] absolute">
          Summary
          <div className="z-10 w-full max-w-5xl items-center h-[30vh] relative border p-4">
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
            <div className="z-10 w-full h-[12vh] relative flex items-end justify-between p-4 ">
              <textarea
                className="border rounded p-2 w-full mr-4 bg-inherit"
                value={review}
                onChange={handleInputChange}
                placeholder="Write your review..."
              />
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleAddReview}
              >
                Rate
              </button>
            </div>
          </div>
          <div className="z-10 w-full max-w-5xl mt-10 h-[36vh] absolute border p-4">
            Reviews
            {reviews.map((review, index) => (
              <div
                key={index}
                className="z-10 w-full relative border flex items-start justify-start p-4"
              >
                <p>{review}</p>
              </div>
            ))}
            <div className="z-10 w-full relative border flex items-start justify-start p-4">
              <p>
                lorem ipsum dolor sit amet, consectetur adip et lorem ipsum
                dolor sit amet, consectetur adip etlorem ipsum dolor sit amet,
              </p>
          </div>
            <div className="z-10 w-full relative border flex items-start justify-start p-4">
              <p>
                lorem ipsum dolor sit amet, consectetur adip et lorem ipsum
                dolor sit amet, consectetur adip etlorem ipsum dolor sit amet,
              </p>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
