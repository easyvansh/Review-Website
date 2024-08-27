"use client"

import { useState } from "react";
import AddReview from "./components/AddReview";
import ListReviews from "./components/ListReviews";



export default function Home() {


  return (
        <div className = "h-screen w-screen flex flex-col gap-4 justify-center items-center">
         <h1>Home</h1>
         
          <a href="/Review"> See REVIEWS</a>
         
         {/* 
         //Click here to see list of reviews
          <a href = 
         //Click here to add review
         <AddReview/>
         
         <ListReviews/> */}
        </div>
  );
}
