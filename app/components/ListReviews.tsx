"use client";

import React, { useEffect, useState } from "react";
import db from "@/utils/firestore.js";
import { collection, getDocs } from "firebase/firestore";
import DeleteReview from "./DeleteReview";
import { FaStar } from "react-icons/fa";

const ListReviews = ({ reviews }) => {


  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">List of Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((item) => (
          <li key={item.id} className="bg-slate-700 shadow-md p-6 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={item.userIcon || "/default-avatar.png"} // Fallback in case no icon is available
                alt={`${item.userName}'s icon`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.userName}</h3>
                <h2 className="text-sm font-semibold">{item.userLevel.charAt(0).toUpperCase() + item.userLevel.slice(1).toLowerCase()}</h2>
                <p className="text-white">{new Date(item.created.seconds * 1000).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{item.rating} / 10</span>
            </div>
            <p className="mt-4 text-white">{item.review}</p>
            <div className="mt-4">
              <DeleteReview id={item.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListReviews;
