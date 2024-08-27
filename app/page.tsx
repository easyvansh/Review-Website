"use client"

import { useState } from "react";
import AddReview from "./components/AddReview";



export default function Home() {


  return (
        <div className = "h-screen w-screen flex justify-center items-center">
         <AddReview/>
        </div>
  );
}
