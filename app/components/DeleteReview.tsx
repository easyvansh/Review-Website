"use client";

import React from "react";
import db from "@/utils/firestore.js";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteReview = ({ id }) => {
  const handleDelete = async () => {
    const itemRef = doc(db, "reviews", id); // Replace 'reviews' with your actual collection name if different
    try {
      await deleteDoc(itemRef);
      alert("Item has been deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="border bg-red-400 p-1 rounded text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteReview;
