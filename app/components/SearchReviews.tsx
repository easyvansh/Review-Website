"use client"
import React, { useState } from "react";
import db from "@/utils/firestore.js";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useRouter } from 'next/navigation';
import SearchResults from "../search-results/page";

const SearchReviews = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ice rink");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== "") {
      router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`);
    }
  };
    console.log(searchResults)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-6 ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border py-4 rounded-lg w-full  bg-inherit"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-4 rounded-lg  bg-inherit"
        >
          <option value="ice rink" className="bg-black">Ice Rink</option>
          <option value="coach" className="bg-black">Coach</option>
          <option value="club" className="bg-black">Club</option>
        </select>
        <button
          type="submit"
          className="bg-slate-600 text-white px-4 py-4 rounded-lg "
        >
          Search
        </button>
      </form>
      
   
    </div>
  );
};

export default SearchReviews;
