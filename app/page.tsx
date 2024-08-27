"use client"

import { useState } from "react";
import AddReview from "./components/AddReview";
import ListReviews from "./components/ListReviews";



export default function Home() {


  return (
        <div className = "h-screen w-screen flex justify-center items-center">
         <AddReview/>
         <ListReviews/>
        </div>
  );
}
