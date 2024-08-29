"use client"

import { useState } from "react";
import AddReview from "./components/AddReview";
import ListReviews from "./components/ListReviews";
import SearchReviews from "./components/SearchReviews";
import AddEntity from "./components/AddEntity";



export default function Home() {


  return (
        <div className = "h-screen w-screen flex flex-col gap-4 justify-center items-center">
         <h1>Home</h1>
         <SearchReviews/>
          <a href="/Review"> See REVIEWS</a>
          <a href="/addEntity"> Add Entity</a>
          
         
         {/* 
         //Click here to see list of reviews
          <a href = 
         //Click here to add review
         <AddReview/>
         
         <ListReviews/> */}
        </div>
  );
}
