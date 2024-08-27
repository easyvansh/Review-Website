"use client";

import React, { useEffect, useState } from "react";
import db from "@/utils/firestore.js";
import { collection, getDocs } from "firebase/firestore";
import DeleteReview from "./DeleteReview";

const ListReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        setReviews(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>List Of Reviews</h2>
      <ul>
        {reviews.map((item) => (
          <li key={item.id}>
           
            <p>{item.userName}</p>
            <p>{item.review}</p>
            <DeleteReview id = {item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListReviews;
